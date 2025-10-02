# Usa l'immagine ufficiale di Node.js
FROM node:22.14.0


# Imposta la directory di lavoro nel container
WORKDIR /app

# Copia il file package.json e package-lock.json nella directory di lavoro
COPY backend/package*.json ./

# Installa le dipendenze del progetto
RUN npm install

# Copia tutto il codice sorgente del progetto nel container
COPY backend/ .

# Esponi la porta su cui l'app girerà
EXPOSE 3000

# Definisci il comando di avvio dell'app
CMD ["npm", "start"]