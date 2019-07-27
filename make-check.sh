#!/usr/bin/env bash

PWD=$(pwd)

set -e

TIMEOUT=15


for file in $(ls $PWD/tests/*.program.scm); do
    echo "* Trying: \"$file\""
    # check javascript
    timeout $TIMEOUT scheme --script ruse.scm javascript "$file" > tmp.js
    cat prelude.js tmp.js postlude.js > test.js
    timeout $TIMEOUT nodejs test.js > "$file.out.js.txt"
done;
