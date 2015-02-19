exports.config = {};
var app = null;
var User = require('../models/user');

exports._init = function (config) {
    exports.config = config;
    app = config.app;

    function register(req, res) {
        var r = req.request;
        var user = new User({
            username: r.username,
            password: r.password
        });
        user.save(function(err) {
            if (err) throw err;
            if(err){
                return app.resEnd(req, res, err);
            }
            return app.resEnd(req, res, {'success':'user created'});
        });
    }
    function login(req, res) {
        var r = req.request;
        User.findOne({ username: r.username }, function(err, user) {
            if (err || !user){
                return app.resEnd(req, res, {errors:[{'message':'User not found'}]});
            }
            user.comparePassword(r.password, function(err, isMatch) {
                if (err) throw err;
                if(isMatch){
                    return app.resEnd(req, res, {success:true, notices:[{'message':'Login Successful'}]});
                }else{
                    return app.resEnd(req, res, {errors:[{'message':'Invalid password'}]});
                }
            });
        });
    }
    app.get('/api/auth/register', register);
    app.post('/api/auth/register', register);

    app.get('/api/auth/login', login);
    app.post('/api/auth/login', login);

    app.post('/api/auth/isLoggedIn', function (req, res) {
        var out = {logged_in: false};
        app.resEnd(req, res, out);
    });
}
;


