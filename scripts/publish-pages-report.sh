#!/usr/bin/env bash
set -euo pipefail

REPORT_SRC="reports/html"
PAGES_DIR="docs"
REPORT_DEST="$PAGES_DIR/report"

if [[ ! -f "$REPORT_SRC/index.html" ]]; then
  echo "Error: $REPORT_SRC/index.html not found."
  echo "Run tests first: npm test"
  exit 1
fi

mkdir -p "$PAGES_DIR"
rm -rf "$REPORT_DEST"
mkdir -p "$REPORT_DEST"

cp -R "$REPORT_SRC"/. "$REPORT_DEST"/

# Ensures GitHub Pages serves static assets exactly as generated.
touch "$PAGES_DIR/.nojekyll"

echo "Published Playwright report to $REPORT_DEST"
echo "Commit docs/ to update GitHub Pages content."
