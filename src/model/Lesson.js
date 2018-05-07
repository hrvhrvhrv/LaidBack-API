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
        type: String,
        required: true
    }
    ,
    pickUpLocation: {
            type: String,
            default: 'Glasgow'
    },

});
LessonSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Lesson', LessonSchema);
