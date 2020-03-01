const createError = require('http-errors');

module.exports = function(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login');
    //return createError(401);
  }
  next();
};