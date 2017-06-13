#!/bin/sh

command_exists() {
  local command="$1"
  command -v "$command" &> /dev/null
}

if command_exists "uglifyjs"; then
  uglifyjs tinymce.js jquery.tinymce.min.js -o concord.tinymce.min.js
else
  echo "You should install uglifyjs (npm i -g uglify-js)"
fi
