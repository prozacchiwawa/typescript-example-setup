My basic setup for working in typescript.  There are other ways to work with
it but this, IMO represents a reasonable default set of packages and build
plan.  Feel free to use this as a starting point for working in typescript.

Setup this way, require calls should use relative paths for most things inside
the project.  Since we mirror the structure of src and build, references from
test and among the compilation units in lib can be relative and will stay
consistent when compiled to javascript in build.  Reference the typings by
relative path too.

Browserify will be able to pick up all of it and make a nice browser loadable
code blob when needed, and you'll be able to require the built javascript by
path in build from node to run mocha tests.
