#!/usr/bin/env bash
# Capture the demo screenshots. Needs playwright + chromium in ~/.shotsenv.
set -euo pipefail
cd "$(dirname "$0")"
NODE_PATH="${HOME}/.shotsenv/node_modules" node shot.js
