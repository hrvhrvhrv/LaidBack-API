// mongooes module imported
import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

// defining data schema for mongoDB
let Schema = mongoose.Schema;

let PupilSchema = new Schema({
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
        unique:true
    },
    registration:{
        provisional: {
            type: Boolean,
            default: true
        },
        theoryTest:{
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
        unique:true
    },
    role: {
        type: String,
        enum: ["Applicant", "Registered","Instructor"],
        default: "Applicant"
    },
    availability: {
        type: Array,
        default: [
            "mon","tue","wed","thur","fri"
        ]
    },
    lessons: [],
    blockBooking: {
        type: Number
    },
    created: { type: Date, default: Date.now }
});

//  using unique validator plugin for mongoDB - it checks that variables are unique and returns detailed errors if not
PupilSchema.plugin(uniqueValidator, { message: 'Please retry {PATH}. {VALUE}' });


module.exports = mongoose.model('Pupil', PupilSchema);