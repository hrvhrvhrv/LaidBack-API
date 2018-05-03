// mongoose module imported
import mongoose from 'mongoose';

// pupil removed as not sure if required
// import Pupil from './Pupil';

// defining data schema for mongoDB
let Schema = mongoose.Schema;

let LessonSchema = new Schema({
    pupilId: {
        type: String,
        required: true
    },
    lessonSLot: {
        type: Number,
        required: true
    },
    lessonDate: {
        type: Number,
        required: true
    }
    ,
    pickUpLocation: {
        type: {
            type: String,
            default: 'Point'
        },
        // coordinates: [Number]
    },
    // Pupil: {type: Schema.Types.ObjectId, ref: 'Pupil'}
});

module.exports = mongoose.model('Lesson', LessonSchema);
