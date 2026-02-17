#!/bin/sh
if [ "$1" = "--build" ]; then
    docker compose up --build
elif [ "$1" = "--down" ]; then
    docker compose down
elif [ "$1" = "--remove" ]; then 
    docker compose down -v
else
    docker compose up
fi