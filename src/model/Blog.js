// mongoose module imported
import mongoose from 'mongoose';

// defining data schema for mongoDB
let Schema = mongoose.Schema;

let BlogPost = new Schema({
   title: {
       type: String,
       required: true
   },
   text:{
       type: String
   },
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BlogPost', BlogPost);
