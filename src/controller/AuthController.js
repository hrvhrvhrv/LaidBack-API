import {Router} from 'express';
import Pupil from '../model/Pupil';


// import VerifyToken from '../middleware/authMiddleware';
import {verifyToken} from '../middleware/authMiddleware';

/*
* configure JWT
* */
import JWT from 'jsonwebtoken';
import Bcrypt from 'bcryptjs';
import config from '../config/index';


export default ({config, db}) => {
    let api = Router();

    // - - - - - - - - - - - - - - - - - -
    // register an account
    // /v1/account/add
    api.post('/register', (req, res) => {
        // Pupil.findOne({email: req.body.email}, function (err, user) {
        //     if (user) {
        //         res.send({
        //             error: err,
        //             message: "Email already exists",
        //             success: false
        //         },401);
        //         console.log(err)
        //     } else {

                let hashedPassword = Bcrypt.hashSync(req.body.password, 8);

                let newPupil = new Pupil();
                newPupil.contact.firstName = req.body.firstName;
                newPupil.contact.lastName = req.body.lastName;
                newPupil.email = req.body.email;
                newPupil.contact.phoneNumber = req.body.phoneNumber;
                newPupil.role = 'Applicant';
                newPupil.password = hashedPassword;
                newPupil.registration.provisional = req.body.provisional;
                newPupil.registration.theoryTest = req.body.theoryTest;
                newPupil.registration.previousLessons = req.body.previousLessons;
                newPupil.registration.location = req.body.location;
                newPupil.availability = req.body.availability;

                newPupil.save(err => {
                    if (err) return res.status(401).json({
                        error: err,
                        message: "There has been an error registering pupil. Please Try again",
                        success: false
                    });

                    // if user is registered without errors
                    // create a token
                    let token = JWT.sign({id: newPupil._id}, config.secret, {
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
    api.post('/login', (req, res) => {

        Pupil.findOne({email: req.body.email}, function (err, user) {
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
            let passwordIsValid = Bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) return res.status(401).json({
                auth: false,
                idToken: null,
                message: "Your password was invalid",
                success: false,

            });

            // if user is found and password is valid
            // create a token
            let token = JWT.sign({id: user._id}, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });

            // return the information including token as JSON
            res.status(200).json({
                auth: true,
                idToken: token,
                message: "You have successfully logged in",
                success: true,
                localId: user._id,
                expiresIn: 86400 // 24hrs
            });
        });

    });

// - - - - - - - - - - - - - - - - - -
    // login
    // /v1/account/login
    api.get('/logout', (req, res) => {
        res.status(200).send({auth: false, idToken: null, message: "You have successfully logged out"});
    });


    // - - - - - - - -
    // Return API at the bottom of the export
    return api;

}