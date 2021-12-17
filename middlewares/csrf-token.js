function addCsrfToken(req, res, next) {
    res.locals.csrfToken = req.csrfToken();  // adding csrftoken to the response of the middleware
    next();                                                     // only if token is valid next function will be executed(gater)
}

module.exports = addCsrfToken;