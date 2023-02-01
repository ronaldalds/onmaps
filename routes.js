const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const contatoController = require('./src/controllers/contatoController');

// routes home
route.get('/', homeController.index);
route.post('/', homeController.form);


// routes contato
route.get('/contato', contatoController.index);

module.exports = route;