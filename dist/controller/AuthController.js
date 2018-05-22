'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _Pupil = require('../model/Pupil');

var _Pupil2 = _interopRequireDefault(_Pupil);

var _authMiddleware = require('../middleware/authMiddleware');

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _index = require('../config/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import VerifyToken from '../middleware/authMiddleware';
exports.default = function (_ref) {
    var config = _ref.config,
        db = _ref.db;

    var api = (0, _express.Router)();

    // - - - - - - - - - - - - - - - - - -
    // register an account
    // /v1/account/add
    api.post('/register', function (req, res) {
        // Pupil.findOne({email: req.body.email}, function (err, user) {
        //     if (user) {
        //         res.send({
        //             error: err,
        //             message: "Email already exists",
        //             success: false
        //         },401);
        //         console.log(err)
        //     } else {

        var hashedPassword = _bcryptjs2.default.hashSync(req.body.password, 8);

        var newPupil = new _Pupil2.default();
        newPupil.firstName = req.body.firstName;
        newPupil.lastName = req.body.lastName;
        newPupil.email = req.body.email;
        newPupil.phoneNumber = req.body.phoneNumber;
        newPupil.password = hashedPassword;
        newPupil.registration.provisional = req.body.provisional;
        newPupil.registration.theoryTest = req.body.theoryTest;
        newPupil.registration.previousLessons = req.body.previousLessons;
        newPupil.location = req.body.location;
        newPupil.availability = req.body.availability;

        newPupil.save(function (err) {
            if (err) return res.status(401).json({
                error: err,
                message: "There has been an error registering pupil. Please Try again",
                success: false
            });

            // if user is registered without errors
            // create a token
            var token = _jsonwebtoken2.default.sign({ id: newPupil._id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.status(200).json({
                auth: true,
                idToken: token,
                message: "Account successfully registered",
                success: true
            });
        });
        //     }
        //
        // });
    });

    // - - - - - - - - - - - - - - - - - -
    // login
    // /v1/account/login
    api.post('/login', function (req, res) {

        _Pupil2.default.findOne({ email: req.body.email }, function (err, user) {
            if (err) return res.status(500).json({
                error: err,
                message: "Error on the server: " + err + ". Please Try again",
                success: false
            });
            if (!user) return res.status(404).json({
                message: "user not found please try again",
                success: false
            });

            // check if the password is valid
            var passwordIsValid = _bcryptjs2.default.compareSync(req.body.password, user.password);
            if (!passwordIsValid) return res.status(401).json({
                auth: false,
                idToken: null,
                message: "Your password was invalid",
                success: false

            });

            // if user is found and password is valid
            // create a token
            var token = _jsonwebtoken2.default.sign({ id: user._id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });

            // return the information including token as JSON
            res.status(200).json({
                auth: true,
                idToken: token,
                message: "You have successfully logged in",
                success: true,
                localId: user._id,
                role: user.role,
                expiresIn: 86400 // 24hrs
            });
        });
    });

    // - - - - - - - - - - - - - - - - - -
    // login
    // /v1/account/login
    api.get('/logout', function (req, res) {
        res.status(200).send({ auth: false, idToken: null, message: "You have successfully logged out" });
    });

    // - - - - - - - -
    // Return API at the bottom of the export
    return api;
};

/*
* configure JWT
* */
//# sourceMappingURL=AuthController.js.map