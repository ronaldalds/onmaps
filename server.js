// configuração variaveis de ambiente
require('dotenv').config();

// import para arquitetura MVC
const express = require('express');
const app = express();
const routes = require('./routes');
const path = require('path');
const { middlewareGlobal } = require('./src/middlewares/middleware');

// configuração mongo
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect(process.env.CONNECTMONGOSTRING) // { useNewUrlParser: true, useUnifiedTopology: true }
.then(() => {
    console.log('Database connected:', process.env.CONNECTMONGOSTRING)
    // lança um evento que a promesse terminou
    app.emit('db_on');
})
// tratar erro em caso de não conectar
.catch(e => console.log(e));

// para receber dados no req de POST
app.use(express.urlencoded({ extended: true }));

// configuração arquivos static
app.use(express.static(path.resolve(__dirname,'public')))

// render views
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(middlewareGlobal);
app.use(routes);

// recebe o evento que a promesse terminou e start server
app.on('db_on', () => {
    app.listen(3000, () => {
        console.log('Server on http://localhost:3000')
    });
});