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
