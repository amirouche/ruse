#!/usr/bin/env bash

PWD=$(pwd)

set -xe

TIMEOUT=15


for file in $(ls $PWD/tests/*.program.scm); do
    echo "* Trying: \"$file\""
    # save translation to scheme for reference
    timeout $TIMEOUT scheme --script ruse.scm scheme "$file" > "$file.out.scm"
    # check javascript
    timeout $TIMEOUT scheme --script ruse.scm javascript "$file" > "tmp-make-check.js"
    cat prelude.js tmp-make-check.js postlude.js > "$file.out.js"
    timeout $TIMEOUT nodejs "$file.out.js" > "$file.out.js.txt"
done;
