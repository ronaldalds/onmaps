// importação de routes do express
const express = require('express');
const route = express.Router();


// importação de controllers
const homeController = require('./src/controllers/homeController');
const contatoController = require('./src/controllers/contatoController');


// routes home controllers
route.get('/', homeController.index);
route.post('/', homeController.form);


// routes contato controllers
route.get('/contato', contatoController.index);


// exporta todas as routes
module.exports = route;