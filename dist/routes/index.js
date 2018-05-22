'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

var _middleware = require('../middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _pupilController = require('../controller/pupilController');

var _pupilController2 = _interopRequireDefault(_pupilController);

var _blogController = require('../controller/blogController');

var _blogController2 = _interopRequireDefault(_blogController);

var _LessonController = require('../controller/LessonController');

var _LessonController2 = _interopRequireDefault(_LessonController);

var _AuthController = require('../controller/AuthController');

var _AuthController2 = _interopRequireDefault(_AuthController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// controller components imported to be usued as part of the api routes
// required modules imported to define routes
var router = (0, _express2.default)();

// connect to db
(0, _db2.default)(function (db) {

    // internal middleware
    router.use((0, _middleware2.default)({ config: _config2.default, db: db }));

    // api routes v1 (/v1)
    router.use('/pupil', (0, _pupilController2.default)({ config: _config2.default, db: db }));
    router.use('/account', (0, _AuthController2.default)({ config: _config2.default, db: db }));
    router.use('/blog', (0, _blogController2.default)({ config: _config2.default, db: db }));
    router.use('/lesson', (0, _LessonController2.default)({ config: _config2.default, db: db }));
});

exports.default = router;
//# sourceMappingURL=index.js.map