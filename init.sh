#!/bin/sh
export JWT_SECRET=$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c 64)
echo "JWT_SECRET generato: $JWT_SECRET"

if [ "$1" = "-build" ]; then
    echo "Eseguo docker compose up con --build..."
    docker compose up --build
elif [ "$1" = "--down" ]; then
    echo "Eseguo docker compose up in detached mode..."
    docker compose down
else
    echo "Eseguo docker compose up..."
    docker compose up
fi