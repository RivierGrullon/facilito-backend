const User = require('../models').User;

module.exports = function(req, res, next){
    if(!req.session.userId) return next();
    User.findByPk(req.session.userId).then(user => {
        if(user){
            req.user = user;
            next();
        }
    })
}