#!/bin/sh
# --- Genera JWT_SECRET casuale ---
export JWT_SECRET=$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c 64)
echo "JWT_SECRET generato: $JWT_SECRET"

# --- Avvia Docker Compose in background ---
docker compose up -d

# --- Attendi che Redis sia pronto ---
echo "Attendo Redis..."
until docker compose exec redis redis-cli ping >/dev/null 2>&1; do
  sleep 1
done
echo "Redis pronto!"

# --- Imposta chiavi iniziali con TTL di 2 ore (7200 secondi) ---
docker compose exec redis redis-cli SET mykey "valore" EX 7200
docker compose exec redis redis-cli SET mykey2 "altro_valore" EX 7200

echo "Chiavi inizializzate con TTL di 2 ore"
docker compose logs -f
