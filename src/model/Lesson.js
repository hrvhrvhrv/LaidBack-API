// mongoose module imported
import mongoose from 'mongoose';


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
        type: String,
        required: true
    }
    ,
    pickUpLocation: {
            type: String,
            default: 'Glasgow'
    },

});

module.exports = mongoose.model('Lesson', LessonSchema);
