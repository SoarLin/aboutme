#!/bin/bash
echo Now User is "$USER"
User="$USER"
CSS=/home/$User/mobile/Include/uc_css
CSSOUT=/home/$User/mobile/Include/css

echo "====Start compressor CSS files===="
for file_path in $CSS/*.css; do
	file=${file_path##*/}
	newName=${file%.*}.min.css
	#echo "   "$newName" <== "$file
	echo "   "$file;
	java -jar yc.jar $CSS/$file -o $CSSOUT/$newName --charset utf-8 --type css
done