exports.config = {};
exports._init = function(config){
    exports.config = config;
};

exports.player_island_list = function(req, res, out, next){
    return next(req, res, {'hello':'world'})
};