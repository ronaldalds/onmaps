const HomeModel = require('../models/HomeModel');

HomeModel.create({
    titulo: 'RALDS',
    descricao: 'dev'
})
.then(dados => console.log(dados))
.catch(e => console.log(e));


// envia pagina
exports.index = (req, res) => {
    res.render('index');
};


// recebe method POST
exports.form = (req, res) => {
    res.send('POST');
};