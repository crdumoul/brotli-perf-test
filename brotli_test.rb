require 'json'
require 'fileutils'

class BrotliTest
  @@results_dir = 'results'
  @@results_json = @@results_dir + '/raw_results.json'

  def run_test
    results = {}

    files = Dir.glob("resources/*/*").reject{|file| File.directory?(file)}
    files.each_index do |index|
      file = files[index]
      extension_index = file.rindex('.');
      next unless extension_index

      next unless File.size(file) > 0

      puts "Processing #{index + 1} of #{files.length} - #{file}"

      file_result = JSON.parse(%x(./brotli-test "#{file}"))
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

  def process_results
    results = JSON.parse(File.read(@@results_json))

    results.each do |content_type, result_array|
      result_array.sort! {|x, y| x['original_size'] <=> y['original_size']}
      File.open("#{@@results_dir}/#{content_type}_results.csv", 'w') do |file|
        write_csv_header(file)

        bucket_results = {}
        result_array.each do |file_result|
          size = file_result['original_size']
          result_line = "#{file_result['filename']},#{size},"
          result_line << (1..11).map {|level| file_result["brotli#{level}_compression"]}.join(',')
          result_line << ",#{file_result['zlib6_compression']},,"
          result_line << (1..11).map {|level| file_result["brotli#{level}_speed"]}.join(',')
          result_line << ",#{file_result['zlib6_speed']}\n"
          file.write(result_line)

          size_bucket = get_size_bucket(size)
          bucket_results[size_bucket] ||= []
          bucket_results[size_bucket] << file_result
        end

        bucket_medians = {}
        bucket_results.each do |bucket_size, result_array|
          bucket_medians[bucket_size] = get_medians(result_array)
        end
        file.write("\n")
        write_csv_medians_header(file)
        bucket_medians.each do |bucket_size, bucket_median|
          write_csv_medians(file, bucket_median, bucket_size)
        end
        global_medians = get_medians(result_array)
        write_csv_medians(file, global_medians, 0)
      end
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

  def write_csv_medians(file, medians, bucket_size)
    bucket_description = bucket_size != 0 ? "#{bucket_size/2} <= size < #{bucket_size}" : 'all'
    file.write("Median (#{bucket_description}),#{medians['num_values']},")
    (1..11).each do |level|
      median = medians["brotli#{level}_median_compression"]
      file.write("#{median},")
    end
    file.write("#{medians['zlib6_median_compression']},,")
    (1..11).each do |level|
      median = medians["brotli#{level}_median_speed"]
      file.write("#{median},")
    end
    file.write("#{medians['zlib6_median_speed']}\n")
  end

  def write_csv_medians_header(file)
    file.write(',count,')
    file.write((1..11).map {|level| "brotli#{level}"}.join(','))
    file.write(',zlib6,,')
    file.write((1..11).map {|level| "brotli#{level}"}.join(','))
    file.write(",zlib6\n")
  end

  def write_csv_header(file)
    file.write(",Size,,,,,,,,,,,,,,Speed\n")
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

test = BrotliTest.new
#test.run_test
test.process_results
