// mongooes module imported
import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

// defining data schema for mongoDB
let Schema = mongoose.Schema;

let PupilSchema = new Schema({
    contact: {
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
        }
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
        },
        location: {
            type: String,
            default: 'G12 ABZ'
            // this to become post code on map point coordinates - possibly!
        }
    },
    password: String,
    email: {
        type: String,
        required: true,
        unique:true
    },
    role: {
        type: String,
        enum: ["Applicant", "Registered"],
        default: "Applicant"
    },
    availability: {
        type: Array,
        default: [
            "mon","tue"
        ]
    },
    lessons: [],
    blockBooking: {
        type: Number
    }
});

//  using unique validator plugin for mongoDB - it checks that variables are unique and returns detailed errors if not
PupilSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Pupil', PupilSchema);