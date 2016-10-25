# Express & mongoose REST API in ES6 with Docker

## Overview

Node, express, mongoose application based on [this boilerplate](https://github.com/KunalKapadia/express-mongoose-es6-rest-api) and packed into a docker container.

## Getting Started

Clone the repo:
```sh
git clone git@github.com:luismendozamx/node-docker-demo.git
cd node-docker-demo
```

Run docker-compose:
```sh
docker-compose up
```

To seed DB run:
```sh
docker-compose build
docker-compose run luismendozamx/node-docker-demo /bin/bash
```

Execute tests inside container:
```sh
# Run tests written in ES6 along with code coverage
docker-compose run luismendozamx/node-docker-demo /bin/bash npm test

# Run tests on file change
docker-compose run luismendozamx/node-docker-demo /bin/bash npm run test:watch

# Run tests enforcing code coverage (configured via .istanbul.yml)
docker-compose run luismendozamx/node-docker-demo /bin/bash npm run test:check-coverage
```
