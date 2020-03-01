var express = require('express');
var router = express.Router();
const User = require('../models/user.js').User;
const createError = require('http-errors');
var AuthError = require('../models/user').AuthError;


router.get('/', function (req, res) {
    res.render('login');
});

router.post('/', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    User.authorize(username, password, function (err, user) {
        if (err) {
            if (err instanceof AuthError) {
                return next(createError(403));
            } else {
                return next(err);
            }
        }

        req.session.user = user._id;
        res.send({});
    });
});

module.exports = router;