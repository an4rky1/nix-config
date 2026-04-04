#!/usr/bin/env bash

# Select area and get geometry
geometry=$(slurp 2>/dev/null) || exit 1

# Parse geometry: x,y WxH
x=$(echo "$geometry" | cut -d' ' -f1 | cut -d',' -f1)
y=$(echo "$geometry" | cut -d' ' -f1 | cut -d',' -f2)
w=$(echo "$geometry" | cut -d' ' -f2 | cut -dx -f1)
h=$(echo "$geometry" | cut -d' ' -f2 | cut -dx -f2)

# Calculate diagonal
diagonal=$(awk "BEGIN {printf \"%.0f\", sqrt($w*$w + $h*$h)}")

# Display result
notify-send "📏 Ruler" "W: ${w}px  H: ${h}px  Diagonal: ${diagonal}px\nPosition: ${x},${y}" -u critical
