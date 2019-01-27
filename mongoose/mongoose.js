const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://172.17.0.2:27017/TodoApp');

module.exports = {mongoose};