// required modules imported to define routes
import express from 'express';
import config from '../config';
import initializeDb from '../db';
import middleware from '../middleware';

// controller components imported to be usued as part of the api routes
import pupilController from '../controller/pupilController';
import blogController from '../controller/blogController';
import lessonController from '../controller/LessonController';
import authController from '../controller/AuthController';

let router = express();

// connect to db
initializeDb(db => {

    // internal middleware
    router.use(middleware({config, db}));

    // api routes v1 (/v1)
    router.use('/pupil', pupilController({config, db}));
    router.use('/account', authController({config, db}));
    router.use('/blog', blogController({config, db}));
    router.use('/lesson', lessonController({config, db}));

});

export default router;
