// mongoose component imported so that defaults can be set
import mongoose from 'mongoose';

export default callback => {

//    variables set to the password and user name used in the mlab database connection
    let name = "Instructor";
    let Password = "Thisshouldbeastrongpassword";

    let db = mongoose.connect( process.env.MONGODB_URI ||'mongodb://' + name + ':' + Password + '@ds251179.mlab.com:51179/laidback');

    callback(db);
}
