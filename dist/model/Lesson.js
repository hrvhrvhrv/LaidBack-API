'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseUniqueValidator = require('mongoose-unique-validator');

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// defining data schema for mongoDB
// mongoose module imported
var Schema = _mongoose2.default.Schema;

var LessonSchema = new Schema({
    pupilId: {
        type: String,
        required: true
    },

    lessonSLot: {
        type: String,
        required: true
    },
    lessonDate: {
        type: Date,
        required: true
    },

    pickUpLocation: {
        type: String,
        default: 'Glasgow'
    },
    created: {
        type: Date,
        default: Date.now
    }
});
LessonSchema.plugin(_mongooseUniqueValidator2.default);

module.exports = _mongoose2.default.model('Lesson', LessonSchema);
//# sourceMappingURL=Lesson.js.map