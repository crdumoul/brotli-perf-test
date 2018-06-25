#!/bin/bash
wget -U "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36" -e robots=off --no-parent --accept htm,html,js,css,xml,json --no-check-certificate -T10 --tries=2 -nd -E -H -p -P resources/$1 $1
