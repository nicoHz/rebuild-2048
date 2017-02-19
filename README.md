
### process-images.sh

Even if they are tiny, bash scripts a great in optimizing personal workflow. 
The following script unzips svg files and prettifies them in one go. 
To give an example: 
A bunch of svg files is zipped in a directory "Bla-Images". Beside the given file format ".svg",
the file name always includes letters and a number, like `blaBla1.svg`. But interested in 
simplify coding, letters aren't needed. Numbers will rule the ascending order. And wouldn't it benice, to work with some xml prettified svg's? 

```sh
#!/bin/bash

set -e

# 1. unzip
unzip $1 -d tmp

# 2. prettify and rename
pushd tmp
ls *.svg | sed 's/[^0-9]*\([0-9]*\.svg\)/cat "&" | \..\/node_modules\/.bin\/pretty-xml > ..\/images\/\1/' | sh
popd
rm -rf tmp
```
#### How it works:
A handy script always starts with the [shebang](https://en.wikipedia.org/wiki/Shebang_(Unix)), 
in this case `#!/bin/bash`.
Without the shebang, it's up to the user to chose an interpreter, every single time.
It tells the shell, which interpreter should be used for this file, 
right here it's bash, given in the path `/bin/bash`. For now `$PATH` as environment variabe is 
out of scope, that's why the script has to be located in one directory next to the zip file
and the program has to be executed with `./scriptname.sh nameOfZipFile`.

To follow the lines of the given script, `set -e` makes sure that the script will stop, if one of the following commands fails. 

`unzip` is used as a command. It does what it says, unzipping files. 
`$n` sets the number of chosen parameters. This program will only take
the firt given paramter (`$1`). The conditional expression `-d` makes sure that the file will be unzipped in a directory `tmp` that is currently created. 

The `pushd` command saves the current working directory in memory. 

The next line does a lot and can be roughly devided in three main parts: 
*First*, list all directory content that is an svg file `ls *.svg` to stout. Ignore the rest of the file name (`*`). 

*Second* Pipe (`|`) the listed svg files from stout to stin of `sed` (stream editor).
[sed](https://en.wikipedia.org/wiki/Sed#Mode_of_operation) is a Unix utility that parses and 
transforms text. There are a lot of `\` in use. In POSIX extended regular expressions, there are metacharacters
that must be preceded by a backslash in order to drop their special meaning and be treated literally inside an 
expression. 

The `s` stands for substitute.The [regular expression](https://en.wikipedia.org/wiki/Regular_expression) to
be searched is placed after the first delimiting `/`. The replacement follows the second `/`. 

A closer look to the regular expression `/[^0-9]*\([0-9]*\.svg\)`: Only numbers and ".svg" will stay in the file 
name. All the other characters will be removed from the file name. 
(*more precise version* `/[^0-9]*\([0-9]*\)[^0-9]*\(\.svg\)`)

Replacement and xml transformation is phrased in `/cat "&" | \..\/node_modules\/.bin\/pretty-xml > ..\/images\/\1/'`, which means:
Read the content of the renamed file to stout and pipe it through the stin of the program "pretty-xml", then redirect it to the "images" directory.  

*Third* Pipe the renamed and prettified svg files from from sed's stout to stin of the shell (bash). 

The `popd` command returns to the path at the top of directory stack.

At least, the tmp directory will be removed (`rm -rf tmp`) to start again with a fresh and clean tmp directory next time, when a zip file needs to be unzipped and prettified.
