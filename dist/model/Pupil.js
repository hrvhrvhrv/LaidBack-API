'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseUniqueValidator = require('mongoose-unique-validator');

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// defining data schema for mongoDB
// mongooes module imported
var Schema = _mongoose2.default.Schema;

var PupilSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    registration: {
        provisional: {
            type: Boolean,
            default: true
        },
        theoryTest: {
            type: Boolean,
            default: false
        },
        previousLessons: {
            type: Number,
            default: 0
        }
    },
    location: {
        type: String,
        default: 'G12 ABZ'

    },
    password: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ["Applicant", "Registered", "Instructor"],
        default: "Applicant"
    },
    availability: {
        type: Array,
        default: ["mon", "tue", "wed", "thur", "fri"]
    },
    lessons: [],
    blockBooking: {
        type: Number
    },
    created: { type: Date, default: Date.now }
});

//  using unique validator plugin for mongoDB - it checks that variables are unique and returns detailed errors if not
PupilSchema.plugin(_mongooseUniqueValidator2.default, { message: 'Please retry {PATH}. {VALUE}' });

module.exports = _mongoose2.default.model('Pupil', PupilSchema);
//# sourceMappingURL=Pupil.js.map