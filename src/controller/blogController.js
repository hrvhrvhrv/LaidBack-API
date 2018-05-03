import {Router} from 'express';
import Blog from '../model/Blog';

// import passport from 'passport';
// import { authenticate } from '../middleware/authMiddleware';


export default ({config, db}) => {
    let api = Router();

    //  read
    // /v1/blog - Read (return all)
    api.get('/', (req, res) => {
        Blog.find({}, (err, blogData) => {
            if (err) {
                res.status(500).json({
                    error: err,
                    message: "There has been an error retrieving blog posts.",
                    success: false
                });
            }
            res.status(200).json(blogData);
        });
    });

    // /v1/blog/:id - Read 1 (return by ID)
    api.get('/:id', (req, res) => {
        Blog.findById(req.params.id, (err, blogData) => {
            if (err) {
                res.status(500).json({
                    error: err,
                    message: "There has been an error retrieving blog posts.",
                    success: false
                });
            }
            res.status(200).json(blogData);
        });
    });

    // /v1/blog/add - Create

    api.post('/add', (req, res) => {
        if (!req.body.title || !req.body.text) {
            res.status(403).json({
                success: false,
                message: 'Please enter blog data'
            });
        }
        let newBlog = new Blog();
        newBlog.title = req.body.title;
        newBlog.text = req.body.text;
        newBlog.save(err => {
            if (err) {
                res.status(500).json({
                    error: err,
                    message: "There has been an error registering pupil. Please Try again",
                    success: false
                });
            }
            res.status(200).json({
                message: 'New blog post successfully saved',
                success: true
            });
        });
    });

    // /v1/blog/:id - Update

    api.put('/:id', (req, res) => {
        Blog.findById(req.params.id, (err, blogData) => {
            if (err) {
                res.status(500).json({
                    error: err,
                    message: "There has been an error registering pupil. Please Try again",
                    success: false
                });
            }
            blogData.title = req.body.title;
            blogData.text = req.body.text;
            blogData.save(err => {
                if (err) {
                    res.status(500).json({
                        error: err,
                        message: "There has been an error registering pupil",
                        success: false
                    });
                }
                res.status(200).json({
                    message: "Blog post successfully updated",
                    success: true
                });
            });
        });
    });

    // /v1/blog/:id - Delete
    api.delete('/:id', (req, res) => {
        Blog.remove({
            _id: req.params.id
        }, (err, pupildata) => {
            if (err) {
                res.status(500).json({
                    error: err,
                    message: "There has been an error registering pupil. Please Try again",
                    success: false
                });
            }
            res.status(200).json({message: "Blog post successfully removed", success: true});

        });
    });

    return api;
}


