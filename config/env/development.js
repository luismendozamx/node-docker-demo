export default {
  env: 'development',
  MONGOOSE_DEBUG: true,
  jwtSecret: '0a6b944d-d2fb-46fc-a85e-0295c986cd9f',
  // db: 'mongodb://localhost:27017/node-docker-api-development', // localhost
  db: 'mongodb://mongo:27017/node-docker-api-development', // container
  // db: 'mongodb://node-demo:vpkBPqrghPeTgYk33qgXiTQnfqDELoioyFC@ds141697.mlab.com:41697/node-docker-api-demo', // hosted
  port: 4040
};
