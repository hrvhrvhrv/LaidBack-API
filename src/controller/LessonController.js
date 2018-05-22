import mongoose from 'mongoose';
import {Router} from 'express';
import Lesson from '../model/Lesson';
import bodyParser from 'body-parser';
// import passport from 'passport';
// import { authenticate } from '../middleware/authMiddleware';

export default ({config, db}) => {
    let api = Router();

    //  read
    // /v1/blog - Read (return all)
    api.get('/', (req, res) => {
        Lesson.find({}, (err, blogData) => {
            if (err) {
                res.send(err);
            }
            res.json(blogData);
        });
    });

    // /v1/blog/:id - Read 1 (return by ID)
    api.get('/:id', (req, res) => {
        Lesson.findById(req.params.id, (err, blogData) => {
            if (err) {
                res.send(err);
            }
            res.json(blogData);
        });
    });



    api.put('/:id', (req, res) => {
        Lesson.findById(req.params.id, (err, lessonData) => {
            if (err) {
                res.send(err);

            }
                lessonData.pupilId = req.params.id;
                lessonData.lessonSLot = req.body.lessonSLot;
                lessonData.lessonDate = req.body.lessonDate;
                lessonData.pickUpLocation = req.body.pickUpLocation;
                lessonData.save((err, review) => {
                    if (err) {
                        res.send(err);
                    }

                    res.json({message: "Lesson info Updated"});
                });
            })
    });

    api.get('/dates/today', (req, res) => {
        let start = new Date();
        start.setHours(0,0,0,0);

        let end = new Date();
        end.setHours(23,59,59,999);

        Lesson.find({"lessonDate": {"$gte": start, "$lt": end}}, (err, lessonData) => {
            if (err) {
                res.send(err);

            }

                res.json(lessonData);
            });

    });

    return api;
}


