#!/usr/bin/env bash

# $1 — substring to match in window title
# $2 — command to run if not found

if [ $# -ne 2 ]; then
    echo "Usage: $(basename "$0") <pattern> <command>" >&2
    exit 1
fi

pattern="$1"
command="$2"

# Check if any window title matches the pattern
if hyprctl clients | grep -q "$pattern"; then
    # Use Hyprland's built-in title: matching for focuswindow
    hyprctl dispatch focuswindow "title:$pattern"
else
    hyprctl dispatch exec "$command"
fi
