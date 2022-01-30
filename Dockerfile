FROM node:16-alpine
ARG MONGODB_URI
ENV CHALLENGE_MONGODB_URI=$MONGODB_URI
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 80
EXPOSE 3000
CMD [ "npm", "run", "start" ]