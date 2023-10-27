FROM node:18

WORKDIR /usr/src/app

# COPY package*.json ./

COPY . .
RUN yarn install --production
RUN yarn run build

CMD "yarn" "start"