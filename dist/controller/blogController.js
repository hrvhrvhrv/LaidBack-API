'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _Blog = require('../model/Blog');

var _Blog2 = _interopRequireDefault(_Blog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import passport from 'passport';
// import { authenticate } from '../middleware/authMiddleware';


exports.default = function (_ref) {
    var config = _ref.config,
        db = _ref.db;

    var api = (0, _express.Router)();

    //  read
    // /v1/blog - Read (return all)
    api.get('/', function (req, res) {
        _Blog2.default.find({}, function (err, blogData) {
            if (err) {
                res.status(500).json({
                    error: err,
                    message: "There has been an error retrieving blog posts.",
                    success: false
                });
            }
            res.status(200).json(blogData);
        });
    });

    // /v1/blog/:id - Read 1 (return by ID)
    api.get('/:id', function (req, res) {
        _Blog2.default.findById(req.params.id, function (err, blogData) {
            if (err) {
                res.status(500).json({
                    error: err,
                    message: "There has been an error retrieving blog posts.",
                    success: false
                });
            }
            res.status(200).json(blogData);
        });
    });

    // /v1/blog/add - Create

    api.post('/add', function (req, res) {
        if (!req.body.title || !req.body.text) {
            res.status(403).json({
                success: false,
                message: 'Please enter blog data'
            });
        }
        var newBlog = new _Blog2.default();
        newBlog.title = req.body.title;
        newBlog.text = req.body.text;
        newBlog.save(function (err) {
            if (err) {
                res.status(500).json({
                    error: err,
                    message: "There has been an error registering pupil. Please Try again",
                    success: false
                });
            }
            res.status(200).json({
                message: 'New blog post successfully saved',
                success: true
            });
        });
    });

    // /v1/blog/:id - Update

    api.put('/:id', function (req, res) {
        _Blog2.default.findById(req.params.id, function (err, blogData) {
            if (err) {
                res.status(500).json({
                    error: err,
                    message: "There has been an error registering pupil. Please Try again",
                    success: false
                });
            }
            blogData.title = req.body.title;
            blogData.text = req.body.text;
            blogData.save(function (err) {
                if (err) {
                    res.status(500).json({
                        error: err,
                        message: "There has been an error registering pupil",
                        success: false
                    });
                }
                res.status(200).json({
                    message: "Blog post successfully updated",
                    success: true
                });
            });
        });
    });

    // /v1/blog/:id - Delete
    api.delete('/:id', function (req, res) {
        _Blog2.default.remove({
            _id: req.params.id
        }, function (err, pupildata) {
            if (err) {
                res.status(500).json({
                    error: err,
                    message: "There has been an error registering pupil. Please Try again",
                    success: false
                });
            }
            res.status(200).json({ message: "Blog post successfully removed", success: true });
        });
    });

    return api;
};
//# sourceMappingURL=blogController.js.map