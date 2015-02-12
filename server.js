var express = require('express');
var bodyParser = require('body-parser')

var app = express();
var static_directory = __dirname + '/app';
var api_directory = __dirname + '/api';
app.use(express.static(static_directory));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));


fs = require('fs');
var config = app.config = require(__dirname + '/config.json');
config.project_name = __dirname.split('/').pop().split('.')[0];

//override config with local config if values are set.
if (fs.existsSync(__dirname+'/config_local.json')) {
    var local_config = require(__dirname+'/config_local.json');
    for(var key in local_config){
        config[key] = local_config[key];
    }
}

//Load and init all modules in the api/ directory
app.api_modules = {};
var files = fs.readdirSync(api_directory);
for(var i=0; i<files.length; i++){
    var filename = files[i];
    var module = require(api_directory + '/' + filename);
    var module_name = filename.split('.')[0];
    app.api_modules[module_name] = module;
    module._init({app:app});
}

//used as a standardized way for apis to respond.
app.resEnd = function(req, res, out){
    return res.json(out);
}

/*
 any route that doesn't contain "." hits this route and loads index
 this is to get push state working.
 At some point, server side rendering could be done for SEO (using PhantomJS)
 */
app.get(/^[^\.]+$/, function (req, res) {
    fs.readFile(static_directory+'/index.html', 'utf8', function (err,data) {
        if (err) {
            res.send('ERROR loading index.html');
        }
        res.send(data);
    });
});


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/'+config.project_name);
app.mongoose = mongoose;
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    app.db = db;
    var server = app.listen(app.config.port, function () {
        var host = server.address().address;
        var port = server.address().port;

        console.log('Example app listening at http://%s:%s', host, port);


    });
});
