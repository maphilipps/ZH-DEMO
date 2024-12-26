#!/bin/bash
FILES=recipes/**/*
for f in $FILES
do
  echo "Processing $f file..."
  sed -i '' '/^uuid:/d' $f
  sed -i '' '/^\_core:/d' $f
  sed -i '' '/^  default_config_hash:/d' $f
done