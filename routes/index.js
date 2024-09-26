const routes = require('express').Router();

routes.get('/', (req, res, next) => {
    res.json('Emma Danso');
});

module.exports = routes;