"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (callback) {

    //    variables set to the password and user name used in the mlab database connection
    var name = "Instructor";
    var Password = "Thisshouldbeastrongpassword";

    var db = _mongoose2.default.connect(process.env.MONGODB_URI || 'mongodb://' + name + ':' + Password + '@ds251179.mlab.com:51179/laidback', { useMongoClient: true });

    callback(db);
}; // mongoose component imported so that defaults can be set
//# sourceMappingURL=db.js.map