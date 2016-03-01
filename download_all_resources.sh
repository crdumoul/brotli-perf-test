#!/bin/bash
mkdir -p resources
cat sites.txt | xargs -n 1 ./download_resources.sh
