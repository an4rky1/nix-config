#!/usr/bin/env bash

mode="direct"

if [ "${1:-}" = "--shell" ]; then
	mode="shell"
	shift
elif [ "${1:-}" = "--terminal" ]; then
	mode="terminal"
	shift
fi

if [ $# -lt 2 ]; then
	echo "Usage: $(basename "$0") [--shell|--terminal] <title-pattern> <command> [args...]" >&2
	exit 1
fi

pattern="$1"
shift

window=$(niri msg --json windows 2>/dev/null | jq -r "map(select(.title | test(\"$pattern\"; \"i\")))[0] | {id, workspace_id}" 2>/dev/null)
window_id=$(echo "$window" | jq -r '.id // empty' 2>/dev/null)

if [ -n "$window_id" ]; then
	workspace_id=$(echo "$window" | jq -r '.workspace_id // empty' 2>/dev/null)
	[ -n "$workspace_id" ] && niri msg action focus-workspace "$workspace_id" 2>/dev/null
	niri msg action focus-window --id "$window_id" 2>/dev/null
else
	case "$mode" in
	shell)
		niri msg action spawn-sh -- "$*"
		;;
	terminal)
		niri msg action spawn-sh -- "kitty --title='$pattern' -e $*"
		;;
	direct)
		niri msg action spawn-sh -- "$*"
		;;
	esac
fi
