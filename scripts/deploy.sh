#!/usr/bin/env bash
# 빌드 결과(out/)만 deploy 브랜치로 올린다. 서버는 deploy 브랜치를 받아 nginx로 서빙.
#   bash scripts/deploy.sh <SITE_URL>   예) bash scripts/deploy.sh http://172.237.20.244:8111
# 서버 갱신: cd /var/www/jcsolution && git fetch -q origin deploy && git reset -q --hard origin/deploy
set -euo pipefail
URL=${1:?SITE_URL}
cd "$(dirname "$0")/.."
rm -rf out
SITE_URL=$URL npx next build
REMOTE=$(git remote get-url origin)
cd out
git init -q -b deploy && git add -A
git -c user.name="$(git -C .. config user.name)" -c user.email="$(git -C .. config user.email)" commit -q -m "deploy: $(date +%F) 시안 A~E"
git -c http.version=HTTP/1.1 push -q -f "$REMOTE" deploy
rm -rf .git
echo "deploy 브랜치 갱신 완료: $(find . -name '*.html' | wc -l) html"
