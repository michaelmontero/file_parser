FROM node:16-alpine As development

WORKDIR /usr/src/app/gd_michael/

COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build
CMD ["npm", "run", "start"]