// const HomeModel = require('../models/HomeModel');

// HomeModel.create({
//     titulo: 'RALDS',
//     descricao: 'dev'
// })
// .then(dados => console.log(dados))
// .catch(e => console.log(e));

exports.index = (req, res) => {
    res.render('index');
};

exports.form = (req, res) => {
    res.send('POST');
};