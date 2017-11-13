#!/usr/bin/env bash

gcloud compute scp ./dist \christopher-genesis-vm:./rental-app --recurse
gcloud compute scp ./scripts \christopher-genesis-vm:./rental-app --recurse
gcloud compute scp ./public \christopher-genesis-vm:./rental-app --recurse
gcloud compute scp ./config \christopher-genesis-vm:./rental-app --recurse
gcloud compute scp ./package.json \christopher-genesis-vm:./rental-app

# If IP changes (VM restarts):
# 1. sudo vi /etc/nginx/sites-available/default (adjust host)
# 2. config/config.js (adjust host) AND adjust HOST environment variable