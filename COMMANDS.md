### List of commands to run for demo

Build container:
```sh
docker build -t node-docker .
```

Run container;
```sh
docker run -it -p 4040:4040 node-docker npm start
```

Run container with volume mounted:
```sh
docker run -it -p 4040:4040 -v `pwd`:/home/app/node-docker/  node-docker npm start
```
