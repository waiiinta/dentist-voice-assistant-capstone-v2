FROM node:18.3.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g node-pre-gyp
RUN npm install --legacy-peer-deps
RUN npm install wrtc
RUN npm rebuild

COPY . .

EXPOSE 3001

CMD ["npm", "run", "start"]