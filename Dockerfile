FROM node:10-alpine

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

WORKDIR /opt

COPY package.json package-lock.json ./
RUN npm install && npm cache clean --force
ENV PATH /opt/node_modules/.bin:$PATH

WORKDIR /opt/app
COPY . .

EXPOSE 3000

CMD ["npm", "start"]