#!/usr/bin/env bash

if [ $# -ne 2 ]; then
    echo "Usage: $(basename "$0") <pattern> <command>" >&2
    exit 1
fi

pattern="$1"
command="$2"

id=$(niri msg windows 2>/dev/null | jq -r ".[] | select(.title | test(\"$pattern\")) | .id" | head -1)

if [ -n "$id" ]; then
    niri msg action focus-window "$id"
else
    niri msg action spawn-sh "$command"
fi
