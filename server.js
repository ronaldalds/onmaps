// configuração variaveis de ambiente
require('dotenv').config();


// import para arquitetura MVC serve do express
const express = require('express');
const app = express();


// importa configuração de routes
const routes = require('./routes');


// import caminho absoluto
const path = require('path');


//import middles
const { middlewareGlobal } = require('./src/middlewares/middleware');


// configuração mongo
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect(process.env.CONNECTMONGOSTRING, { useNewUrlParser: true, useUnifiedTopology: true }) // { useNewUrlParser: true, useUnifiedTopology: true }
.then(() => {
    console.log('Database connected:', 'MongoDB on')
    // lança um evento que a promesse terminou
    app.emit('db_on');
})
// tratar erro em caso de não conectar
.catch(e => console.log(e));


// criação session
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');


// para receber dados no req de POST
app.use(express.urlencoded({ extended: true }));


// configuração para uso de arquivos static
app.use(express.static(path.resolve(__dirname,'public')))


// configuração de session
const sessionOptions = session({
    secret: process.env.SCRETSESSION,
    store: MongoStore.create({ mongoUrl: process.env.CONNECTMONGOSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 1,
        httpOnly: true
    }
});


// uso da session no express
app.use(sessionOptions);
app.use(flash());

// configuração de engine para render views
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');


// uso de middlewares
app.use(middlewareGlobal);


// uso de routes
app.use(routes);


// recebe o evento que a promesse terminou e start db
app.on('db_on', () => {
    // inicia o server em uma porta
    app.listen(3000, () => {
        console.log('Server on http://localhost:3000')
    });
});