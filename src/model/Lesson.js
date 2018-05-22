// mongoose module imported
import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';


// defining data schema for mongoDB
let Schema = mongoose.Schema;

let LessonSchema = new Schema({
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
    }
    ,
    pickUpLocation: {
            type: String,
            default: 'Glasgow'
    },
    created: {
        type: Date,
        default: Date.now
    }
});
LessonSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Lesson', LessonSchema);
