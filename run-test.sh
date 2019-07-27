#!/usr/bin/env bash

set -e

file=$1
TIMEOUT=15

echo "* Running: \"$file\""


timeout $TIMEOUT scheme --script ruse.scm javascript "$file" > tmp.js
cat prelude.js tmp.js postlude.js > test.js
timeout $TIMEOUT nodejs test.js > "$file.out.js.txt"
