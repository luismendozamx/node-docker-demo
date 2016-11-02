### List of commands to run for demo

Build container (with db on localhost):
```sh
docker build -t node-docker .
```

Build container:
```sh
docker build -t node-docker .
```

Run container (with db on localhost):
```sh
docker run -it -p 4040:4040 node-docker npm start
```

Run container with volume mounted:
```sh
docker run -it -p 4040:4040 -v `pwd`:/home/app/node-docker/ node-docker npm start
```

Change db config to hosted MongoDB.

Run docker-compose (with hosted MongoDB):
```sh
docker-compose up
```

Change db config to linked container MongoDB.

Run tests inside docker container.
```sh
docker-compose run node-docker npm run test
```

Build the image for pushing to Docker hub:
```sh
docker build -t luismendozamx/node-docker .
```

Push the image:
```sh
docker push luismendozamx/node-docker:latest
```

Pull the latest version of the image:
```sh
docker pull luismendozamx/node-docker:latest
```

CI flow in Jenkins:
```sh
IMAGE_NAME="luismendozamx/node-docker:latest"

# login
docker login -u luismendozamx -p mySuperSecretPassword

#build image
docker build -t $IMAGE_NAME .

# run tests
docker run --rm $IMAGE_NAME npm run test

# push image
docker push $IMAGE_NAME
```
