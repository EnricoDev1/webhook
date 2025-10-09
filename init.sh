#!/bin/sh
export JWT_SECRET=$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c 64)
echo "JWT_SECRET generato: $JWT_SECRET"

docker compose up -d

echo "Attendo Redis..."
until docker compose exec redis redis-cli ping >/dev/null 2>&1; do
  sleep 1
done
echo "Redis pronto!"

docker compose exec redis redis-cli SET mykey "valore" EX 60
docker compose exec redis redis-cli SET mykey2 "altro_valore" EX 60
docker compose logs -f
