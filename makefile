
LDLIBS=-lstdc++ -lbrotlienc -lz

all: brotli-test

brotli-test: brotli-test.o

clean:
	rm brotli-test.o brotli-test
