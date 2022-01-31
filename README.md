# The Challenge API

This is a simple API being built as part of an execise.
The updated code can be found on this repo.
The current testable deployment is available on 54.164.163.253 . I am not currently using a loadBalancer and AWS Fargate does not allow attaching EIP, so there is a chance that this IP change - please ping me in this case.

Example request:
``curl -X POST \
  http://54.164.163.253/ \
  -H 'content-type: application/json' \
  -d '{
	"startDate": "2016-01-26",
	"endDate": "2016-02-02",
	"minCount": 2000,
	"maxCount": 3000
}'``

## Running local
Requirements:
    - Node 16.x

`npm install`
`npm run start`

## Tests
`npm run test`

## Deploy
Requirements:
    - Docker
    - AWS CLI
    - Have a ECS fargate container ready.

- To deploy this app, first create a docker image passing the mongoDB URI as a build arg like in the example below:
`docker build --build-arg MONGODB_URI=${CHALLENGE_MONGODB_URI} -t challenge-api .`

- Push the image to AWS ECR
`aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 886669708035.dkr.ecr.us-east-1.amazonaws.com`
`docker tag challenge-api:latest 886669708035.dkr.ecr.us-east-1.amazonaws.com/challenge-api:latest`
`docker push 886669708035.dkr.ecr.us-east-1.amazonaws.com/challenge-api:latest`

- Jump into AWS console and create a new task definition for the just uploaded image. For sure a manual step is not ideal and I would like to have this resolved as script. However I am afraid I could be running out of the scope of this exercise and already going over the proposed time to finish.

- A service should be created based on the task definition for a cluster. For this exercise I've used a fargate cluster. After running the service, the API should be exposed on port 80.


## Stack Used
 - Node
 - Express
 - Jest
 - Supertest
 - AWS ECS Fargate