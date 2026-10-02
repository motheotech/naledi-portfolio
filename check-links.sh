#!/usr/bin/env bash
# Verify every outbound link, including the certificate verification URLs.
# Run from the repo root:  bash check-links.sh
set -uo pipefail

urls=$(grep -rhoE 'https?://[^"'"'"' <>)]+' --include='*.html' --include='*.js' . 2>/dev/null \
  | grep -vE 'fonts\.(googleapis|gstatic)\.com|schema\.org|sitemaps\.org|localhost|motheotech\.github\.io' \
  | sed 's/[.,]$//' | sort -u)

fail=0
while IFS= read -r u; do
  [ -z "$u" ] && continue
  code=$(curl -sSL -o /dev/null -w '%{http_code}' -A 'Mozilla/5.0' --max-time 20 "$u" 2>/dev/null || echo 000)
  case "$code" in
    2*|3*) printf '  \033[32m%s\033[0m  %s\n' "$code" "$u" ;;
    *)     printf '  \033[31m%s\033[0m  %s\n' "$code" "$u"; fail=$((fail+1)) ;;
  esac
done <<< "$urls"

echo
if [ "$fail" -gt 0 ]; then
  echo "$fail link(s) failed. LinkedIn often returns 999 to scripts; open it in a"
  echo "browser before assuming it is broken."
  exit 1
fi
echo "All links OK."
