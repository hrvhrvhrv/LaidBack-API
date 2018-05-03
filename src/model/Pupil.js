// mongooes module imported
import mongoose from 'mongoose';

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
            required: true

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
    email: String,
    role: String,
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


module.exports = mongoose.model('Pupil', PupilSchema);