const createError = require('http-errors');
const mongoose = require('../lib/mongoose');

const mazeSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true, //уникальность
        required: true //поле обязательно должно быть
    },
    theme: String,
    enter: Array,
    exit: Array,
    maze: [[]],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now
    }
});

exports.Maze = mongoose.model('Maze', mazeSchema);