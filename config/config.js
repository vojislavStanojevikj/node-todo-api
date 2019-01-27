const {PORT} = require('../config/config.json');

const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    process.env.MONGODB_URI = 'mongodb://172.17.0.2:27017/TodoApp';
    process.env.PORT = PORT;
} else if (env === 'test') {
    process.env.MONGODB_URI = 'mongodb://172.17.0.2:27017/TodoAppTest';
    process.env.PORT = PORT;
}