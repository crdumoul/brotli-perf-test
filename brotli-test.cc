#include <stdlib.h>
#include <stdio.h>
#include <brotli/enc/encode.h>
#include <zlib.h>
#include <time.h>
#include <iostream>
#include <sstream>
#include <iomanip>

size_t file_size(FILE * file) {
  fseek(file, 0, SEEK_END);
  size_t size = ftell(file);
  fseek(file, 0, SEEK_SET);
  return size;
}

FILE * open_file(const char * filename, const char * mode) {
  FILE * file = fopen(filename, mode);
  if (file == NULL) {
    perror("fopen failed");
  }
  return file;
}

void read_data(FILE * file, char ** data, size_t * size) {
  *size = file_size(file);
  *data = (char *) malloc(*size);
  if (0 == fread(*data, 1, *size, file)) {
    throw "Failed to read from file";
  }
  return;
}

size_t brotli_compress(int level, const char * input_data, size_t input_size, char * output_data, size_t output_buffer_size) {
  brotli::BrotliParams params;
  params.quality = level;
  brotli::BrotliMemIn in(input_data, input_size);
  brotli::BrotliMemOut out(output_data, output_buffer_size);
  if (!brotli::BrotliCompress(params, &in, &out)) {
    throw "Failure in BrotliCompress";
  }
  return out.position();
}

size_t zlib_compress(int level, const char * input_data, size_t input_size, char * output_data, size_t output_buffer_size) {
  z_stream strm;
  strm.zalloc = Z_NULL;
  strm.zfree = Z_NULL;
  strm.opaque = Z_NULL;
  if (Z_OK != deflateInit2(&strm, level, Z_DEFLATED, 15 + 16, 8, Z_DEFAULT_STRATEGY)) {
    throw "Failure in deflateInit";
  }
  strm.avail_in = input_size;
  strm.next_in = (unsigned char *) input_data;
  strm.avail_out = output_buffer_size;
  strm.next_out = (unsigned char *) output_data;
  if (Z_STREAM_ERROR == deflate(&strm, Z_FINISH)) {
    throw "Failure in deflate";
  }
  if (0 != strm.avail_in) {
    throw "Failed to consume entire input in deflate";
  }
  size_t output_size = output_buffer_size - strm.avail_out;
  deflateEnd(&strm);
  return output_size;
}

typedef size_t (*CompressionFunc)(int, const char *, size_t, char *, size_t);

void measure_compress(const char * name, int level, const char * input_data, size_t input_size, char * output_data, size_t output_buffer_size, CompressionFunc compress, std::ostream & results) {
  int repetitions = 100;
  size_t total_output_size = 0;
  clock_t start = clock();
  for (int i = 0 ; i < repetitions ; i++) {
    total_output_size += compress(level, input_data, input_size, output_data, output_buffer_size);
  }
  clock_t end = clock();
  float elapsed_time = (float) (end - start) / CLOCKS_PER_SEC;

  float compressed_size = (float) total_output_size / (input_size * repetitions);
  float compression_speed = (float) total_output_size / (elapsed_time*1024*1024);
  results << "\"" << name << level << "_compression\":" << std::setprecision(3) << compressed_size << ", \"";
  results << name << level << "_speed\":" << std::setprecision(3) << compression_speed;
}

int main (int argc, char ** argv) {
  try {
    FILE * infile = open_file(argv[1], "rb");
    if (infile == NULL) {
      exit(1);
    }
    char * input_data = NULL;
    size_t input_size = 0;
    read_data(infile, &input_data, &input_size);
    fclose(infile);

    size_t output_buffer_size = input_size * 2;
    char * output_data = (char *) malloc(output_buffer_size);

    std::ostringstream results;
    results << "{\"valid\":true, \"original_size\":" << input_size << ",\n";
    for (int level = 1 ; level <= 11 ; level ++) {
      measure_compress("brotli", level, input_data, input_size, output_data, output_buffer_size, brotli_compress, results);
      results << ",\n";
    }
    measure_compress("zlib", 6, input_data, input_size, output_data, output_buffer_size, zlib_compress, results);
    results << "}\n";
    std::cout << results.str();
  } catch (const char * message) {
    std::cout << "{\"valid\":false, \"message\":\"" << message << "\"}\n";
  }
  return 0;
}
