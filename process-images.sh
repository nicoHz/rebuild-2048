#!/bin/bash

#set -e

if [[ "$1" == "--help" || "$1" == "-h" || "$1" == "" ]]; then
	echo "Usage: process-images.sh zipfile"
	echo
	echo "unzips, prettifies and renames svg files".
	echo "Non-svg files are ignored. Names of svg files must contain digits (e.g. 'bla888bla.svg'). New file names are reduced to given digits (e.g. '888.svg')." 
	echo "Prettified svg files are written to directory 'images/', which is assumed to exist." 
	exit 1
fi

# 1. unzip
unzip $1 -d tmp

# 2. prettify and rename
# Taken from http://stackoverflow.com/questions/2372719/using-sed-to-mass-rename-files
pushd tmp
ls *.svg | sed 's/[^0-9]*\([0-9]*\).*\(\.svg\)/cat "&" | \..\/node_modules\/.bin\/pretty-xml > ..\/images\/\1\2/' | sh
popd
rm -rf tmp
