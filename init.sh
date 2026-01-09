#!/bin/sh
if [ "$1" = "--build" ]; then
    docker compose up --build
elif [ "$1" = "--down" ]; then
    docker compose down
elif [ "$1" = "--remove" ]; then 
    docker compose down -v
elif [ "$1" = "--prod" ]; then
    sed -i 's|COPY default.conf|COPY default.prod.conf|' "./nginx/Dockerfile"
    echo "[+] nginx Dockerfile updated"
    docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build 
else
    docker compose up
fi