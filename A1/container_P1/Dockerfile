FROM node:14
WORKDIR /usr/src/app
COPY . .
VOLUME [ "/usr/src/app" ]
RUN npm install
EXPOSE 6000
CMD [ "node", "index.js" ]