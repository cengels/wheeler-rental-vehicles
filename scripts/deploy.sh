#!/usr/bin/env bash

gcloud compute ssh cengels@christopher-genesis-vm --command "mkdir ./rental-app"
gcloud compute ssh cengels@christopher-genesis-vm --command "mkdir ./rental-app/dist"
gcloud compute ssh cengels@christopher-genesis-vm --command "mkdir ./rental-app/logs"
gcloud compute scp ./package.json \christopher-genesis-vm:./rental-app
gcloud compute scp ./scripts \christopher-genesis-vm:./rental-app --recurse
gcloud compute scp ./public \christopher-genesis-vm:./rental-app --recurse
gcloud compute scp ./config \christopher-genesis-vm:./rental-app --recurse
gcloud compute scp ./dist/app \christopher-genesis-vm:./rental-app/dist --recurse

# If IP changes (VM restarts):
# 1. sudo vi /etc/nginx/sites-available/default (adjust host)
# 2. config (adjust host) AND adjust HOST environment variable