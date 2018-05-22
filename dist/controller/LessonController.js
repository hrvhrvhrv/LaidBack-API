'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _Lesson = require('../model/Lesson');

var _Lesson2 = _interopRequireDefault(_Lesson);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

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
        _Lesson2.default.find({}, function (err, blogData) {
            if (err) {
                res.send(err);
            }
            res.json(blogData);
        });
    });

    // /v1/blog/:id - Read 1 (return by ID)
    api.get('/:id', function (req, res) {
        _Lesson2.default.findById(req.params.id, function (err, blogData) {
            if (err) {
                res.send(err);
            }
            res.json(blogData);
        });
    });

    api.put('/:id', function (req, res) {
        _Lesson2.default.findById(req.params.id, function (err, lessonData) {
            if (err) {
                res.send(err);
            }
            lessonData.pupilId = req.params.id;
            lessonData.lessonSLot = req.body.lessonSLot;
            lessonData.lessonDate = req.body.lessonDate;
            lessonData.pickUpLocation = req.body.pickUpLocation;
            lessonData.save(function (err, review) {
                if (err) {
                    res.send(err);
                }

                res.json({ message: "Lesson info Updated" });
            });
        });
    });

    api.get('/dates/today', function (req, res) {
        var start = new Date();
        start.setHours(0, 0, 0, 0);

        var end = new Date();
        end.setHours(23, 59, 59, 999);

        _Lesson2.default.find({ "lessonDate": { "$gte": start, "$lt": end } }, function (err, lessonData) {
            if (err) {
                res.send(err);
            }

            res.json(lessonData);
        });
    });

    return api;
};
//# sourceMappingURL=LessonController.js.map