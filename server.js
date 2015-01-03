var express = require('express');
var app = express();
var static_directory = __dirname + '/app';
app.use(express.static(static_directory));
fs = require('fs');


app.get(/^[^\.]+$/, function (req, res) {
    fs.readFile(static_directory+'/index.html', 'utf8', function (err,data) {
        if (err) {
            res.send('ERROR loading index.html');
        }
        res.send(data);
    });
});

var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});