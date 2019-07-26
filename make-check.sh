#!/usr/bin/env bash

PWD=$(pwd)

set -xe

TIMEOUT=15


for file in $(ls $PWD/tests/*.program.scm); do
    echo "* Trying: \"$file\""
    # check translation into a subset of scheme is still correct
    timeout $TIMEOUT scheme --script ruse.scm scheme "$file" > "$file.out.scm"
    timeout $TIMEOUT scheme --script "$file.out.scm" > "$file.out.scm.txt"
    # check javascript
    timeout $TIMEOUT scheme --script ruse.scm javascript "$file" > "tmp-make-check.js"
    cat prelude.js tmp-make-check.js postlude.js > "$file.out.js"
    timeout $TIMEOUT nodejs "$file.out.js" > "$file.out.js.txt"
done;
