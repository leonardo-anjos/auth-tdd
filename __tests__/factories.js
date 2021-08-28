const { factory } = require('factory-girl');
const { User } = require('../src/app/models');

factory.define('User', User, {
  name: 'leo',
  email: 'leodrums11@gmail.com',
  password: '123456'
});

module.exports = factory;