export default {
  env: 'test',
  jwtSecret: '0a6b944d-d2fb-46fc-a85e-0295c986cd9f',
  // db: 'mongodb://localhost:27017/node-docker-api-development', // localhost
  db: 'mongodb://mongo:27017/node-docker-api-development', // container
  port: 4040
};
