#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${1:-http://localhost:8080}"
TITLES=("Hollow Knight" "Cuphead" "Elden Ring" "Nine Sols" "Sekiro: Shadows Die Twice" "Celeste")

for title in "${TITLES[@]}"; do
    game_id=$(curl -fsS --get --data-urlencode "q=${title}" "${BASE_URL}/api/games" \
        | python3 -c '
import sys, json
target = sys.argv[1].lower()
for row in json.load(sys.stdin):
    if (row.get("title") or "").lower() == target:
        print(row["gameId"])
        break
' "${title}")

    if [ -z "${game_id}" ]; then
        echo "FAIL: no game titled '${title}' - run unlockt-seed.sql first" >&2
        exit 1
    fi

    count=$(curl -fsS "${BASE_URL}/api/games/${game_id}/achievements" \
        | python3 -c 'import sys, json; print(len(json.load(sys.stdin)))')

    if [ "${count}" -eq 0 ]; then
        echo "FAIL: '${title}' returned 0 achievements - check STEAM_API_KEY" >&2
        exit 1
    fi

    echo "OK: ${title} has ${count} achievements"
done

echo "Warm. Safe to run unlockt-seed-achievement-ratings.sql"
