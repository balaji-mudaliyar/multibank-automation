#!/usr/bin/env bash
set -euo pipefail

IMAGE_NAME="multibank-automation"
SERVICE_NAME="tests"
USE_COMPOSE="false"

usage() {
  cat <<'EOF'
Usage:
  ./scripts/tests.sh build [--compose]
  ./scripts/tests.sh test [--compose] [-- <playwright args>]
  ./scripts/tests.sh spec <spec-path> [--compose] [-- <playwright args>]

Examples:
  ./scripts/tests.sh build
  ./scripts/tests.sh test
  ./scripts/tests.sh test -- --project=chromium
  ./scripts/tests.sh test --compose
  ./scripts/tests.sh spec tests/ui/navigation/home.spec.ts
  ./scripts/tests.sh spec tests/ui/navigation/home.spec.ts --compose -- -g "invalid route"
EOF
}

if [[ $# -lt 1 ]]; then
  usage
  exit 1
fi

COMMAND="$1"
shift

SPEC_PATH=""
if [[ "$COMMAND" == "spec" ]]; then
  if [[ $# -lt 1 ]]; then
    echo "Error: missing <spec-path> for spec command."
    usage
    exit 1
  fi
  SPEC_PATH="$1"
  shift
fi

EXTRA_ARGS=()
while [[ $# -gt 0 ]]; do
  case "$1" in
    --compose)
      USE_COMPOSE="true"
      shift
      ;;
    --)
      shift
      EXTRA_ARGS=("$@")
      break
      ;;
    *)
      echo "Error: unknown argument '$1'"
      usage
      exit 1
      ;;
  esac
done

run_compose_build() {
  docker compose build "$SERVICE_NAME"
}

run_compose_test() {
  local playwright_args=(npx playwright test)
  if ((${#EXTRA_ARGS[@]})); then
    playwright_args+=("${EXTRA_ARGS[@]}")
  fi

  docker compose run --rm "$SERVICE_NAME" "${playwright_args[@]}"
}

run_compose_spec() {
  local playwright_args=(npx playwright test "$SPEC_PATH")
  if ((${#EXTRA_ARGS[@]})); then
    playwright_args+=("${EXTRA_ARGS[@]}")
  fi

  docker compose run --rm "$SERVICE_NAME" "${playwright_args[@]}"
}

run_docker_build() {
  docker build -t "$IMAGE_NAME" .
}

run_docker_test() {
  local playwright_args=(npx playwright test)
  if ((${#EXTRA_ARGS[@]})); then
    playwright_args+=("${EXTRA_ARGS[@]}")
  fi

  docker run --rm \
    -e CI=true \
    -e BASE_URL="${BASE_URL:-https://mb.io/en-AE}" \
    -v "$PWD/reports:/app/reports" \
    -v "$PWD/test-results:/app/test-results" \
    -v "$PWD/playwright-report:/app/playwright-report" \
    "$IMAGE_NAME" \
    "${playwright_args[@]}"
}

run_docker_spec() {
  local playwright_args=(npx playwright test "$SPEC_PATH")
  if ((${#EXTRA_ARGS[@]})); then
    playwright_args+=("${EXTRA_ARGS[@]}")
  fi

  docker run --rm \
    -e CI=true \
    -e BASE_URL="${BASE_URL:-https://mb.io/en-AE}" \
    -v "$PWD/reports:/app/reports" \
    -v "$PWD/test-results:/app/test-results" \
    -v "$PWD/playwright-report:/app/playwright-report" \
    "$IMAGE_NAME" \
    "${playwright_args[@]}"
}

case "$COMMAND" in
  build)
    if [[ "$USE_COMPOSE" == "true" ]]; then
      run_compose_build
    else
      run_docker_build
    fi
    ;;
  test)
    if [[ "$USE_COMPOSE" == "true" ]]; then
      run_compose_test
    else
      run_docker_test
    fi
    ;;
  spec)
    if [[ "$USE_COMPOSE" == "true" ]]; then
      run_compose_spec
    else
      run_docker_spec
    fi
    ;;
  -h|--help|help)
    usage
    ;;
  *)
    echo "Error: unknown command '$COMMAND'"
    usage
    exit 1
    ;;
esac
