exports.config = {};
var app = null;
var db = null;
var mongoose = require('mongoose');
exports._init = function(config){
    exports.config = config;
    app = config.app;

    function register(req, res){
        var out = {body:req.body, query:req.query, 'path':'auth'};
        app.resEnd(req, res, out);
    }
    app.get('/api/auth/register', register);
    app.post('/api/auth/register', register);

};


