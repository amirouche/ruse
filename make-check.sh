#!/usr/bin/env bash

PWD=$(pwd)

set -e

for file in $(ls $PWD/tests/*.scm); do
    ./run-test.sh $file
done;

# check that the tests did not change results files
git diff --quiet ./tests/
