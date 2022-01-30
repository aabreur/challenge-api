# The Challenge API

This is a simple API being built as part of an execise.

## Running local
`npm install`
`npm run start`

## Tests

## Deploy
To deploy this app, first create an docker image passing the mongoDB URI as a build arg like in the example below:
`$ docker build --build-arg MONGODB_URI=${CHALLENGE_MONGODB_URI} -t challenge-api .`
`aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 886669708035.dkr.ecr.us-east-1.amazonaws.com`
`docker tag challenge-api:latest 886669708035.dkr.ecr.us-east-1.amazonaws.com/challenge-api:latest`

## Stack Used
