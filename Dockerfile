# Base image
FROM node:latest
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN yarn install && yarn cache clean

# Bundle app source
COPY . /usr/src/app

CMD [ "yarn", "start" ]
