FROM node:latest
RUN mkdir -p /app
WORKDIR /app
ADD package.json /app/package.json
RUN npm config set registry http://registry.npmjs.org/
RUN npm install
EXPOSE 8080
CMD npm run $COMMAND
