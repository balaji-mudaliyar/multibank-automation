#!/usr/bin/env bash
set -euo pipefail

RESULTS_DIR="allure-results"
ALLURE_HTML_DIR="reports/allure-html"
PAGES_DIR="docs"
ALLURE_DEST="$PAGES_DIR/allure"

if [[ ! -d "$RESULTS_DIR" ]]; then
  echo "Error: $RESULTS_DIR not found."
  echo "Run tests first: npm test"
  exit 1
fi

npx allure generate "$RESULTS_DIR" --clean -o "$ALLURE_HTML_DIR"

if [[ ! -f "$ALLURE_HTML_DIR/index.html" ]]; then
  echo "Error: $ALLURE_HTML_DIR/index.html not found after generation."
  exit 1
fi

mkdir -p "$PAGES_DIR"
rm -rf "$ALLURE_DEST"
mkdir -p "$ALLURE_DEST"

cp -R "$ALLURE_HTML_DIR"/. "$ALLURE_DEST"/

# Ensures GitHub Pages serves static assets exactly as generated.
touch "$PAGES_DIR/.nojekyll"

echo "Published Allure report to $ALLURE_DEST"
echo "Commit docs/ to update GitHub Pages content."
