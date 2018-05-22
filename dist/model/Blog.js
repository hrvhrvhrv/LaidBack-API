'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// defining data schema for mongoDB
var Schema = _mongoose2.default.Schema; // mongoose module imported


var BlogPost = new Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String
    },
    created: { type: Date, default: Date.now }
});

module.exports = _mongoose2.default.model('BlogPost', BlogPost);
//# sourceMappingURL=Blog.js.map