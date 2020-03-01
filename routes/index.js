const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const checkAuth = require('../middleware/checkAuth');
const Maze = require('../models/modMaze.js').Maze;

router.get('/', checkAuth, function(req, res) {
    res.render('index');
});

router.post('/', function (req, res) {
    if (req.headers.button === 'save') {
        let objMaze = req.body;
        let maze = new Maze(
            {
                name: objMaze.name,
                theme: objMaze.theme,
                enter: objMaze.enter,
                exit: objMaze.exit,
                maze: objMaze.maze,
                owner: req.session.user
            }
        );
        maze.save(function (err) {
            if (err) return createError(err);
        });
        res.setHeader('Status', 'Saved!');
        res.send();
    } else {
        let id = req.body.id;
        console.log(id);
        Maze.findById(id, function (err, maze) {
            if (err) {
                createError(err);
            } else {
                console.log(maze);
                res.json(maze);
            }
        });
    }
});

router.post('/getDocuments', function (req, res) {
    Maze.find({owner: req.session.user}, function (err, docs) {
        if (err) {
            createError(err);
        } else {
            res.json(docs);
        }
    });
});
module.exports = router;