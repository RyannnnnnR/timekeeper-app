'use strict';

var fs        = require('fs');
var path      = require('path');
var basename  = path.basename(__filename);
var routes = {};

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        var url = path.join(__dirname, file);
        var router = require(url);
        console.log(path.basename(url, '.js').charAt(0).toUpperCase() + url.substr());
        routes[path.basename(url, '.js').charAt(0).toUpperCase() +path.basename(url, '.js').slice(1)] = router;
    });

module.exports = routes;