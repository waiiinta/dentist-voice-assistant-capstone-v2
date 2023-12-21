FROM node:18-alpine3.14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --legacy-peer-deps
RUN npm install -g serve
RUN npm install --save-dev @babel/plugin-proposal-private-property-in-object --legacy-peer-deps


# Resolve Module not found: Error: Can't resolve 'fs'
RUN sed -i '$ d' node_modules/@tensorflow-models/speech-commands/package.json
RUN echo ",\"browser\": { \"fs\": false }}" >> node_modules/@tensorflow-models/speech-commands/package.json
COPY . .

EXPOSE 5001

RUN npm run build
CMD ["serve", "-l", "5001", "-s", "build", "--ssl-cert", "cert.pem", "--ssl-key", "key.pem"]
# CMD ["serve", "-l", "5001", "-s", "build"]