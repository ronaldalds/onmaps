// envia pagina
exports.index = (req, res) => {
    // req.session.usuario = { nome: 'ralds', logado: true};
    // console.log(req.session.usuario)

    res.render('index');
    return;
};


// recebe method POST
exports.form = (req, res) => {
    res.send('POST');
};