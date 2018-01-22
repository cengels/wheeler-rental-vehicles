#!/usr/bin/env bash

rm -rf ./dist
babel src -d dist
rm -rf ./dist/app/__tests__
cp -rf ./src/app/views ./dist/app/views
cp -rf ./src/app/styles ./dist/app/styles