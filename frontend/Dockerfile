# Usa l'immagine ufficiale di Node.js
FROM node:22.14.0

# Imposta la directory di lavoro nel container
WORKDIR /app

# Copia i file di configurazione (package.json e package-lock.json)
COPY frontend/package*.json ./


# Installa le dipendenze del progetto
RUN npm install

# Copia tutto il codice sorgente del frontend nel container
COPY frontend/ .

# Esponi la porta su cui il frontend sarà in ascolto
EXPOSE 5173

# Avvia l'applicazione
CMD ["npm","run", "dev"]