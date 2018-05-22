// importing router module from express
import {Router} from 'express';

// importing models to be used when posting to database
import Pupil from '../model/Pupil';
import Lesson from '../model/Lesson';


//  verify token is imported to be used to guard routes
import VerifyToken from '../middleware/authMiddleware';


export default ({config, db}) => {
    let api = Router();

    // //  read
    // // /v1/pupil - Read (return all)
    api.get('/', (req, res) => {
        Pupil.find({}, (err, pupilData) => {
            if (err) {
                res.status(500).json({
                    error: err,
                    message: "There has been an error "
                });
            }
            res.json(pupilData);
        });
    });
    //
    // // /v1/pupil/:id - Read 1 (return by ID)
    //
    api.get('/:id', (req, res) => {
        Pupil.findById(req.params.id, {password: 0}, (err, pupilData) => {
            if (err) {
                res.status(500).json({error: err, message: "Woop wop somethings gone wrong!"});
            }
            res.json(pupilData);
        });
    });


    // // /v1/pupil/reg/:id - Read 1 (return by ID)
    //

    // Used to get a list of users whose role matches that as passed in the URL as :name

    api.get('/regList/:name', (req, res) => {
        Pupil.find({role: req.params.name}, (err, pupilData) => {
            if (err) {
                res.status(500).json({error: err, message: "Woop wop somethings gone wrong!"});
            }
            res.json(pupilData);
        });
    });

    // /v1/pupil/add - Create

    // api.post('/add', (req, res) => {
    //     let newPupil = new Pupil();
    //     newPupil.contact.firstName = req.body.firstName;
    //     newPupil.contact.lastName = req.body.lastName;
    //     newPupil.contact.email = req.body.email;
    //     newPupil.contact.phoneNumber = req.body.phoneNumber;
    //     newPupil.password = req.body.password;
    //     newPupil.registration.provisional = req.body.provisional;
    //     newPupil.registration.theoryTest = req.body.theoryTest;
    //     newPupil.registration.previousLessons = req.body.previousLessons;
    //     newPupil.registration.location = req.body.location;
    //     newPupil.availability = req.body.availability;
    //
    //     newPupil.save(err => {
    //         if (err) {
    //             res.status(500).json({error: err, message: "Woop wop somethings gone wrong!"});
    //         }
    //
    //         res.status(200).json({
    //             message: 'new Pupil saved successfully'
    //         });
    //     });
    // });


    // // /v1/pupil/:id - Update
    //
    api.put('/:id', (req, res) => {
        Pupil.findById(req.params.id, (err, pupilData) => {
            if (err) {
                res.status(500).json({error: err, message: "Woop wop somethings gone wrong!"});
            }
            pupilData.location = req.body.location;
            pupilData.email = req.body.email;
            pupilData.phoneNumber = req.body.phoneNumber;

            pupilData.save(err => {
                if (err) {
                    res.status(500).json({error: err, message: "Woop wop somethings gone wrong!"});
                }
                res.status(200).json({message: "Pupil info updated"});
            });

        });
    });

    // // /v1/pupil/registered/:id - Update
    //
    //
    api.put('/registered/:id', (req, res) => {
        Pupil.findById(req.params.id, (err, pupilData) => {
            if (err) {
                res.status(500).json({error: err, message: "Woop wop somethings gone wrong!"});
            }
            pupilData.role = 'Registered';

            pupilData.save(err => {
                if (err) {
                    res.status(500).json({error: err, message: "Woop wop somethings gone wrong!"});
                }
                res.status(200).json({message: "Pupil info updated"});
            });

        });
    });
    // // /v1/pupil/:id - Delete
    api.delete('/:id', (req, res) => {
        Pupil.remove({
            _id: req.params.id
        }, (err) => {
            if (err) {
                res.status(500).json({error: err, message: "Woop wop somethings gone wrong!"});
            }
            Lesson.remove({
                pupilId: req.params.id
            }, (err) => {
                if (err) {
                    res.status(500).json({error: err, message: "Woop wop somethings gone wrong!"});
                }
                res.status(200).json({message: "Pupil and lessons Successfully Removed"});
            });
        });
    });


    //  add lesson for specific pupil ID
    // /v1/pupil/lesson/add/:id
    api.post('/lesson/add/:id', (req, res) => {
        Pupil.findById(req.params.id, (err, pupilData) => {
            if (err) {
                res.status(500).json({error: err, message: "Woop wop somethings gone wrong!"});
            }
            let newLesson = new Lesson();

            newLesson.pupilId = req.params.id;
            newLesson.lessonSLot = req.body.lessonSLot;
            newLesson.lessonDate = req.body.lessonDate;
            newLesson.pickUpLocation = req.body.pickUpLocation;
            newLesson.save((err, review) => {
                if (err) {
                    res.status(500).json({error: err, message: "Woop wop somethings gone wrong!"});
                }
                pupilData.lessons.push(review);
                pupilData.save(err => {
                    if (err) {
                        res.status(500).json({error: err, message: "Woop wop somethings gone wrong!"});
                    }
                    res.status(200).json({message: "Lesson for pupil added"});
                })
            })
        });
    });

    // update specific lesson ID
    //  // /v1/pupil/lesson/edit/:id
    api.put('/lesson/edit/:id', (req, res) => {

        let LessonID = req.params.id;
        let conditions = {_id: LessonID},
            conditions2 = {_id: LessonID}
            , update = {
                $set: {
                    "lessonSLot": req.body.lessonSLot,
                    "lessonDate": req.body.lessonDate
                    // "Pupil.lessons.lessonSlot": lessonData.lessonSLot

                }
            }
            , options = {multi: true};


        // let resLessonData = {
        //         $set: {
        //             "lessonSLot": req.body.lessonSLot,
        //             "lessonDate": req.body.lessonDate
        //             // "Pupil.lessons.lessonSlot": lessonData.lessonSLot
        //
        //         }};


        // Lesson.update(LessonID, resLessonData, (err, lessonDataRes) => {
        Lesson.update(conditions, update, options, (err, lessonDataRes) => {
            if (err) {
                res.status(500).json({error: err, message: "Woop wop somethings gone wrong!"});
            }

            //  To update the lesson on the pupil document we select the Pupil document and use findOneAndUpdate
            //  The pupil is selected using hte _id from the lesson pupil id
            // //  The second variable is telling mongoose to
            // //
            //


            res.status(200).json({message: "Lesson info Updated I think this time??", data: lessonDataRes});
        });

        // Pupil.update({_id: lessonDataRes.pupilId}, update, options, (err) => {
        //     if (err) {
        //         res.status(500).json({error: err, message: "Woop wop somethings gone wrong!"});
        //     }
        // });
        // }); // end of find pupil
    });


    // - - - - - - - - - -
    // Second attempt!
    // - - - - - - - - - -

    // // update specific lesson ID
    //  // /v1/pupil/lesson/edit/:id
    // api.put('/lesson/edit/:id', (req, res) => {
    //     // finds lesson by id based on the params passed by the URL
    //     Lesson.findById(req.params.id, (err, lessonData) => {
    //         // if there is an error it is returned to the browser with message and 401 http code
    //         if (err) {
    //             res.status(500).json({error: err, message: "Woop wop somethings gone wrong!"});
    //
    //         }
    //
    //
    //     // // let lessonData = {};
    //     // let LessonID = req.params.id;
    //     //
    //     //  if the data is found it is returned as an object named lessonData
    //     //  each key is updated with the object data put through on the request
    //     lessonData.pupilId = req.params.id;
    //     lessonData.lessonSLot = req.body.lessonSLot;
    //     lessonData.lessonDate = req.body.lessonDate;
    //     lessonData.pickUpLocation = req.body.pickUpLocation;
    //
    //         lessonData.save((err, lessonDataRes) => {
    //             if (err) {
    //                 res.status(500).json({
    //                     error: err,
    //                     message: "There has been an error registering pupil",
    //                     success: false
    //                 });
    //             }
    //
    //
    //             //- - - -
    //             Pupil.update(lessonDataRes._id, (err, lessonData) => {
    //                 // if there is an error it is returned to the browser with message and 401 http code
    //                 if (err) {
    //                     res.status(500).json({error: err, message: "Woop wop somethings gone wrong!"});
    //
    //                 }
    //                 lessonData.save(err => {
    //                     if (err) {
    //                         res.status(500).json({
    //                             error: err,
    //                             message: "There has been an error registering pupil",
    //                             success: false
    //                         });
    //                     }
    //                     res.status(200).json({
    //                         message: "Blog post successfully updated",
    //                         success: true
    //                     });
    //                 } )
    //
    //             });
    //             // - - - - -
    //
    //
    //             res.status(200).json({
    //                 message: "Blog post successfully updated",
    //                 success: true
    //             });
    //         });
    //
    //
    //
    //
    //
    //
    //      // Lesson is then updated using findOneAndUpdate passing the updated data object
    //      // Using the _id as an identifier of which lesson to update
    //      // This updates the Lesson document
    //     // Lesson.findOneAndUpdate({_id: LessonID}, {
    //     //     $set: {
    //     //         "lessonSlot": req.body.lessonSLot,
    //     //         "lessonDate": req.body.lessonDate
    //     //         // "Pupil.lessons.lessonSlot": lessonData.lessonSLot
    //     //     }
    //     // }, (err) => {
    //     //     if (err) {
    //     //         res.status(500).json({error: err, message: "Woop wop somethings gone wrong!"});
    //     //     }
    //     //
    //     //     //  To update the lesson on the pupil document we select the Pupil document and use findOneAndUpdate
    //     //     //  The pupil is selected using hte _id from the lesson pupil id
    //     //     // //  The second variable is telling mongoose to
    //     //     // //
    //     //     //
    //     //     // Pupil.findOneAndUpdate({_id: lessonData.pupilId}, {
    //     //     //     $set: {
    //     //     //         "lessons.lessonSlot": lessonData.lessonSLot,
    //     //     //         "lessons.lessonDate": lessonData.lessonDate
    //     //     //         // "Pupil.lessons.lessonSlot": lessonData.lessonSLot
    //     //     //
    //     //     //     }
    //     //     // }, (err) => {
    //     //     //     if (err) {
    //     //     //         res.status(500).json({error: err, message: "Woop wop somethings gone wrong!"});
    //     //     //     }
    //     //     // });
    //     //     res.status(200).json({message: "Lesson info Updated I think?"});
    //     // });
    //     }); // end of find pupil
    // });


    // get all lessons for a specific pupil id
    // /v1/foodTruck/reviews/:id
    api.get('/lesson/:id', (req, res) => {
        Lesson.find({pupilId: req.params.id}, (err, lessons) => {
            if (err) {
                res.status(500).json({error: err, message: "Woop wop somethings gone wrong!"});
            }
            res.status(200).json(lessons);
        })
    });


    //  return should be at the bottom of the export to return the api
    return api;
}


