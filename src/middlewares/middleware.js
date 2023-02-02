exports.middlewareGlobal = (req, res, next) => {
    res.locals.middleUser = 'ralds';
    next();
}