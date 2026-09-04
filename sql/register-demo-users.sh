#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${1:-http://localhost:8080}"
PASSWORD="${DEMO_PASSWORD:-password}"
JAR=$(mktemp)
trap 'rm -f "${JAR}"' EXIT

USERS=(
    "hollowsoul@demo.unlockt|HollowSoul"
    "parrykin@demo.unlockt|ParryKing"
    "nogold@demo.unlockt|NoGoldNoGlory"
    "ashenone@demo.unlockt|AshenOne"
    "deathless@demo.unlockt|Deathless"
    "strawberry@demo.unlockt|StrawberryJam"
    "shinobi@demo.unlockt|ShinobiExec"
    "voidheart@demo.unlockt|VoidHeart"
    "solseeker@demo.unlockt|SolSeeker"
    "onehitwonder@demo.unlockt|OneHitWonder"
)

curl -sS -o /dev/null -c "${JAR}" "${BASE_URL}/api/auth/me"
TOKEN=$(awk '$6 == "XSRF-TOKEN" { print $7 }' "${JAR}")

if [ -z "${TOKEN}" ]; then
    echo "FAIL: no XSRF-TOKEN cookie from ${BASE_URL}/api/auth/me - is the app up?" >&2
    exit 1
fi

created=0
existing=0

for row in "${USERS[@]}"; do
    email="${row%%|*}"
    name="${row##*|}"

    status=$(curl -sS -o /tmp/reg-body.$$ -w '%{http_code}' \
        -b "${JAR}" -c "${JAR}" \
        -H 'Content-Type: application/json' \
        -H "X-XSRF-TOKEN: ${TOKEN}" \
        -X POST "${BASE_URL}/api/users" \
        --data "$(printf '{"email":"%s","displayName":"%s","passwordHash":"%s"}' "${email}" "${name}" "${PASSWORD}")")

    case "${status}" in
        201) created=$((created + 1)); echo "created  ${email}" ;;
        400) existing=$((existing + 1)); echo "exists   ${email}" ;;
        *)   echo "FAIL: ${email} returned ${status}" >&2; cat /tmp/reg-body.$$ >&2; rm -f /tmp/reg-body.$$; exit 1 ;;
    esac
    rm -f /tmp/reg-body.$$
done

echo "${created} created, ${existing} already present. Safe to run unlockt-seed-demo.sql"
