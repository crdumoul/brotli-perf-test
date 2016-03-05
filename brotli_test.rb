require 'json'
require 'fileutils'

class BrotliTest
  @@results_dir = 'results'
  @@results_json = @@results_dir + '/raw_results.json'

  def run_test(start)
    results = read_raw_results

    files = Dir.glob("resources/*/*").reject{|file| File.directory?(file)}
    files.sort!
    to_process = files.slice(start..-1)
    to_process.each_index do |index|
      file = to_process[index]
      extension_index = file.rindex('.');
      slash_index = file.rindex('/');
      next unless extension_index && (extension_index > slash_index)
      next unless File.size(file) > 16

      puts "Processing #{index + start + 1} of #{files.length} - #{file}"

      file_result = JSON.parse(%x(./brotli-test '#{file.gsub("'", "'\"'\"'")}'))
      next unless file_result['valid']
      file_result['filename'] = file.sub('resources/', '')

      content_type = file.slice((extension_index+1)..-1)
      results[content_type] ||= []
      results[content_type] << file_result

      write_raw_results(results)
    end
  end

  def write_raw_results(results)
    FileUtils.mkdir_p(@@results_dir)
    File.open(@@results_json, 'w') do |file|
      file.write(JSON.generate(results))
    end
  end

  def read_raw_results
    if File.exist?(@@results_json)
      JSON.parse(File.read(@@results_json))
    else
      {}
    end
  end

  def process_results
    results = JSON.parse(File.read(@@results_json))
    all_results = []
    results.each do |content_type, result_array|
      process_content_type(content_type, result_array)
      all_results.concat(result_array)
    end
    process_content_type('all', all_results)
  end

  def process_content_type(content_type, result_array)
    puts "Processing #{content_type} results"
    result_array.sort! {|x, y| x['original_size'] <=> y['original_size']}

    bucket_results = {}
    File.open("#{@@results_dir}/#{content_type}_raw_results.csv", 'w') do |file|
      write_csv_raw_header(file)
      result_array.each do |file_result|
        size = file_result['original_size']
        result_line = "\"#{file_result['filename']}\",#{size},"
        result_line << (1..11).map {|level| file_result["brotli#{level}_compression"]}.join(',')
        result_line << ",#{file_result['zlib6_compression']},,"
        result_line << (1..11).map {|level| file_result["brotli#{level}_speed"]}.join(',')
        result_line << ",#{file_result['zlib6_speed']}\n"
        file.write(result_line)

        size_bucket = get_size_bucket(size)
        bucket_results[size_bucket] ||= []
        bucket_results[size_bucket] << file_result
      end
    end

    File.open("#{@@results_dir}/#{content_type}_processed_results.csv", 'w') do |file|
      bucket_medians = {}
      bucket_results.each do |bucket_size, result_array|
        bucket_medians[bucket_size] = get_medians(result_array)
      end
      global_medians = get_medians(result_array)

      file.write("Median Compressed File Size\n")
      write_csv_processed_header(file, true)
      bucket_medians.each do |bucket_size, bucket_median|
        write_csv_medians_compression(file, bucket_median, bucket_size)
      end
      write_csv_medians_compression(file, global_medians, 0)

      file.write("\nMedian Speed (MB/s)\n")
      write_csv_processed_header(file, true)
      bucket_medians.each do |bucket_size, bucket_median|
        write_csv_medians_speed(file, bucket_median, bucket_size)
      end
      write_csv_medians_speed(file, global_medians, 0)

      file.write("\nCompressed File Size Improvement vs zlib6\n")
      write_csv_processed_header(file, false)
      bucket_medians.each do |bucket_size, bucket_median|
        write_csv_median_improvement_compression(file, bucket_median, bucket_size)
      end
      write_csv_median_improvement_compression(file, global_medians, 0)

      file.write("\nSpeed Improvement vs zlib6\n")
      write_csv_processed_header(file, false)
      bucket_medians.each do |bucket_size, bucket_median|
        write_csv_median_improvement_speed(file, bucket_median, bucket_size)
      end
      write_csv_median_improvement_speed(file, global_medians, 0)

      file.write("\n")
    end
  end

  def get_medians(result_array)
    medians = {'num_values' => result_array.length}
    (1..11).each do |level|
      sorted_by_compression = result_array.map {|entry| entry["brotli#{level}_compression"]}.sort
      medians["brotli#{level}_median_compression"] = median(sorted_by_compression)

      sorted_by_speed = result_array.map {|entry| entry["brotli#{level}_speed"]}.sort
      medians["brotli#{level}_median_speed"] = median(sorted_by_speed)
    end
    sorted_by_compression = result_array.map {|entry| entry["zlib6_compression"]}.sort
    medians["zlib6_median_compression"] = median(sorted_by_compression)

    sorted_by_speed = result_array.map {|entry| entry["zlib6_speed"]}.sort
    medians["zlib6_median_speed"] = median(sorted_by_speed)
    medians
  end

  def bucket_description(bucket_size)
    description = bucket_size != 0 ? "(#{bucket_size/2} <= size <= #{bucket_size})" : '(all)'
  end

  def write_csv_median_improvement_compression(file, medians, bucket_size)
    file.write("#{bucket_description(bucket_size)},,")
    zlib_compression = medians['zlib6_median_compression']
    (1..11).each do |level|
      brotli_compression = medians["brotli#{level}_median_compression"]
      improvement = (zlib_compression - brotli_compression) / zlib_compression
      file.write("#{improvement.round(3)},")
    end
    file.write("\n")
  end

  def write_csv_median_improvement_speed(file, medians, bucket_size)
    file.write("#{bucket_description(bucket_size)},,")
    zlib_speed = medians['zlib6_median_speed']
    (1..11).each do |level|
      brotli_speed = medians["brotli#{level}_median_speed"]
      improvement = (brotli_speed - zlib_speed) / zlib_speed
      file.write("#{improvement.round(3)},")
    end
    file.write("\n")
  end

  def write_csv_medians_compression(file, medians, bucket_size)
    file.write("#{bucket_description(bucket_size)},#{medians['num_values']},")
    (1..11).each do |level|
      median = medians["brotli#{level}_median_compression"]
      file.write("#{median},")
    end
    file.write("#{medians['zlib6_median_compression']}\n")
  end
  def write_csv_medians_speed(file, medians, bucket_size)
    file.write("#{bucket_description(bucket_size)},#{medians['num_values']},")
    (1..11).each do |level|
      median = medians["brotli#{level}_median_speed"]
      file.write("#{median},")
    end
    file.write("#{medians['zlib6_median_speed']}\n")
  end

  def write_csv_processed_header(file, for_median)
    file.write(",#{for_median ? 'samples' : ''},")
    file.write((1..11).map {|level| "brotli#{level}"}.join(','))
    if for_median
      file.write(",zlib6\n")
    else
      file.write("\n")
    end
  end

  def write_csv_raw_header(file)
    file.write(",Size,,,,,,,,,,,,,,Speed (MB/s)\n")
    file.write('filename,original,')
    file.write((1..11).map {|level| "brotli#{level}"}.join(','))
    file.write(',zlib6,,')
    file.write((1..11).map {|level| "brotli#{level}"}.join(','))
    file.write(",zlib6\n")
  end

  def get_size_bucket(size)
    power = 0
    while size > 0 do
      size = size >> 1
      power = power + 1
    end
    2 ** power
  end

  def median(array)
    len = array.length
    (array[(len - 1) / 2] + array[len / 2]) / 2.0
  end
end

start_index = ARGV[0] ? (ARGV[0].to_i - 1) : 0
test = BrotliTest.new
#test.run_test(start_index)
test.process_results
