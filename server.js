console.log('starting - '+ new Date());




var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var static_directory = __dirname + '/app';
var api_directory = __dirname + '/api';
app.use(express.static(static_directory));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

//merges get, post, and cookies into one object, req.request (similar to this: http://php.net/manual/en/reserved.variables.request.php)
app.use(function requestSetter(req, res, next){
    req.request = {};
    var collections = [req.query, req.body, req.cookies];
    for(var i=0; i<collections.length; i++){
        var collection = collections[i];
        if(collection){
            for(var key in collection){
                req.request[key] = collection[key];
            }
        }
    }
    return next();
});

console.log('compiling scss');
var sass = require('node-sass');
sass.render({
    file: static_directory + '/app.scss',
    success: function(result){
        var fs = require('fs');
        fs.writeFile(static_directory + '/app.css', result.css);
        console.log(result.css);
        console.log(result.stats);
        console.log(result.map)
    },
    error: function(error) {
        // error is an object: v2 change
        console.log('SCSS ERROR!');
        console.log(error.message);
        console.log(error.code);
        console.log(error.line);
        console.log(error.column); // new in v2
    }
});


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
};

/*
 any route that doesn't contain "." hits this route and loads index
 this is to get push state working.
 At some point, server side rendering could be done for SEO (using PhantomJS)
 */
//var index = null;
app.get(/^[^\.]+$/, function (req, res) {
    var index = null;
    if(index){
        res.send(index);
    }else {
        fs.readFile(static_directory + '/index.html', 'utf8', function (err, local_index) {
            if (err) {
                res.send('ERROR loading index.html');
            }
            index = local_index;

            res.send(index);
        });
    }
});


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/'+config.project_name);
app.mongoose = mongoose;
var db = mongoose.connection;

console.log('opening db connection to '+ 'mongodb://localhost/'+config.project_name);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('db open');
    app.db = db;
    console.log('Starting server on port '+app.config.port);
    var server = app.listen(app.config.port, function () {
        var host = server.address().address;
        var port = server.address().port;

        console.log('App listening at http://%s:%s', host, port);


    });
});
