const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');

// Rotas da home
route.get('/', homeController.index);
route.get('/home/index', homeController.home);

// Rotas de login
route.get('/login/index', loginController.index);
route.get('/login/logoff', loginController.logoff);
route.post('/login/logon', loginController.logon);
route.post('/login/register', loginController.register);

module.exports = route;
