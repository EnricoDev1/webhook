#!/bin/sh
export JWT_SECRET=$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c 64)
echo "JWT_SECRET generato: $JWT_SECRET"

if [ "$1" = "--build" ]; then
    docker compose up --build
elif [ "$1" = "--down" ]; then
    docker compose down
else
    docker compose up
fi