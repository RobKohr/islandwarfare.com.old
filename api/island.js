exports.config = {};
var app = null;
var db = null;
console.log('here');
exports._init = function(config){
    exports.config = config;
    app = config.app;
    db = app.db;

    app.get('/api/islands/my', function(req, res){
        var out = {

        };
        app.resEnd(req, res, out);
    });
    app.get('/api/islands/:user'), function(req, res){

    }
};

