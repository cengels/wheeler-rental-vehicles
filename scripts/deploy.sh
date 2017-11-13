#!/usr/bin/env bash

rm -rf ./dist
babel src -d dist --presets es2015,stage-2
rm -rf ./dist/app/__tests__
cp -rf ./src/app/views ./dist/app/views
cp -rf ./src/app/styles ./dist/app/styles
gcloud compute scp ./dist \christopher-genesis-vm:./rental-app --recurse
gcloud compute scp ./scripts \christopher-genesis-vm:./rental-app --recurse
gcloud compute scp ./public \christopher-genesis-vm:./rental-app --recurse
gcloud compute scp ./config \christopher-genesis-vm:./rental-app --recurse
gcloud compute scp ./package.json \christopher-genesis-vm:./rental-app

# If IP changes (VM restarts):
# 1. sudo vi /etc/nginx/sites-available/default (adjust host)
# 2. config/config.js (adjust host) AND adjust HOST environment variable