#!/usr/bin/env bash
# Builds the Angular app, copies it into Spring Boot's static folder, and packages one jar.
set -euo pipefail
cd "$(dirname "$0")"

(cd frontend && npm ci && npx ng build)

rm -rf backend/src/main/resources/static
mkdir -p backend/src/main/resources/static
cp -r frontend/dist/frontend/browser/. backend/src/main/resources/static/

(cd backend && mvn -q clean package)
echo "Done. Run: java -jar backend/target/portfolio-1.0.0.jar"
