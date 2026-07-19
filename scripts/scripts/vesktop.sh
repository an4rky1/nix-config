#!/usr/bin/env bash
exec vesktop \
  --enable-features=UseOzonePlatform \
  --ozone-platform=wayland \
  "$@"
