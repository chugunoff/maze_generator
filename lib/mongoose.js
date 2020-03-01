const mongoose = require('mongoose');
const config = require('../config');

mongoose.connect('mongodb://localhost:27017/maze', {
    useCreateIndex: true,
    useNewUrlParser: true
});

module.exports = mongoose;