#!/usr/bin/env bash
# Launch Zen Browser in private mode on a new workspace

hyprctl dispatch exec "[workspace empty silent] zen-beta --private-window"
