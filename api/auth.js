exports.config = {};
var app = null;
var mongoose = require('mongoose');
exports._init = function (config) {
    exports.config = config;
    app = config.app;

    function register(req, res) {

        var out = {
            request: req.request,
            errors: [
                {
                    target:'error target id'
                }
            ]
        };
        app.resEnd(req, res, out);
    }
    app.get('/api/auth/register', register);
    app.post('/api/auth/register', register);
    app.post('/api/auth/isLoggedIn', function (req, res) {
        var out = {logged_in: false};
        app.resEnd(req, res, out);
    });
}
;


