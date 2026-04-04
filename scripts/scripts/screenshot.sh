#!/usr/bin/env bash

dir="$HOME/Pictures/Screenshots"
time=$(date +'%Y_%m_%d_at_%Hh%Mm%Ss')
file="${dir}/Screenshot_${time}.png"

export GRIMBLAST_HIDE_CURSOR=0

copy() {
    grimblast --freeze copy area
}

save() {
    grimblast --freeze save area "$file" && notify-send "Screenshot" "Saved to $file"
}

swappy_() {
    grimblast --freeze save area "$file" && notify-send "Screenshot" "Saved to $file" && swappy -f "$file"
}

if [[ ! -d "$dir" ]]; then
    mkdir -p "$dir"
fi

if [[ "$1" == "--copy" ]]; then
    copy
elif [[ "$1" == "--save" ]]; then
    save
elif [[ "$1" == "--swappy" ]]; then
    swappy_
else
    echo -e "Available Options: --copy --save --swappy"
fi

exit 0
