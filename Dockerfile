FROM node:11

# Create app directory
WORKDIR /usr/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install --quiet

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
