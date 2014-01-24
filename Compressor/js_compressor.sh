#!/bin/bash
echo Now User is "$USER"
User="$USER"
JS=/home/$User/mobile/Include/uc_js
JSOUT=/home/$User/mobile/Include/js

echo "====Start compressor JavaScript files===="
echo " 1. 3rd party library"

JS_3RD=3rd
for file_path in $JS/$JS_3RD/*.js; do
    file=${file_path##*/}
    newName=${file%.*}.min.js
    #echo "   "$newName" <== "$file
    echo "   "$file;
    uglifyjs $JS/$JS_3RD/$file -m -o $JSOUT/$JS_3RD/$newName
done

echo " 2. Self-used library"
for file_path in $JS/*.js; do
    file=${file_path##*/}
    newName=${file%.*}.js
    #echo "   "$newName" <== "$file
    echo "   "$file;
    uglifyjs $JS/$file -m -o $JSOUT/$newName
done

echo " 3. White board library"
WB_RD=whiteboard
for file_path in $JS/$WB_RD/*.js; do
    file=${file_path##*/}
    newName=${file%.*}.js
    #echo "   "$newName" <== "$file
    echo "   "$file;
    uglifyjs $JS/$WB_RD/$file -m -o $JSOUT/$WB_RD/$newName
done