# pull official base image
FROM alpine:3.10

ENV NODE_VERSION 15.9.0

# set working directory
WORKDIR /frontend

# add `/frontend/node_modules/.bin` to $PATH
ENV PATH /frontend/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
COPY env ./

RUN npm install --silent
RUN npm install react-scripts@4.0.1 -g --silent

# add backend app
COPY . ./

# start app
CMD [ "npm", "start" ]
