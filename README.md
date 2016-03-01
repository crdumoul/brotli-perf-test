# README #

This tool tests the compression ratio and speed of Brotli at various levels compared to Zlib (Gzip) level 6.
The resources used to test compression are HTML, JS, and CSS taken from the websites in the sites.txt list.

The Brotli library is taken from the git repo at https://github.com/bagder/libbrotli. This repo is a wrapper on the core Brotli code (from https://github.com/google/brotli) which compiles and installs a library that can be used in any C/C++ program.
To install libbrotli:

	git clone https://github.com/bagder/libbrotli.git
	cd libbrotli
	./autogen.sh
	./configure
	make
	sudo make install

The actual compression test is performed by the program defined in brotli-test.cc. The steps are:

1. Read the file contents into memory.
2. Take a timestamp to mark the start of the test.
3. Compress the file 100 times using Brotli level 1.
4. Take a timestamp to mark the end of the test.
5. Record the compressed file size and compression speed (in MB/s).
6. Repeat steps 2-5 for Brotli level 2-11.
7. Repeat steps 2-5 for Gzip level 6.
8. Output the results in JSON format.

The Ruby program brotli_test.rb calls brotli-test once for each file under the resources directory, stores the raw results in the file results/raw_results.json, and then processes the data to generate the final results as CSV files in the results folder. The CSV files can be imported into a spreadsheet like Google Docs.

To run the test:

	ruby brotli_test.rb

The test files are already in the resources directory, however repopulating the resources directory from the websites in the sites.txt list is done like this:

	./download_all_resources.sh

