# pull official base image
FROM alpine:3.13

ENV NODE_VERSION 15.9.0

# set working directory
WORKDIR /backend

# add `/backend/node_modules/.bin` to $PATH
ENV PATH /backend/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
COPY config.json ./

RUN npm install --silent

# add backend app
COPY . ./

# start app
CMD [ "npm", "start" ]