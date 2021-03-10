const express = require('express')
const router = express.Router()
const {Job, User} = require('../database/models')
const mongoose = require('mongoose');

//Gets all jobs in database
router.get('/jobs', (req, res) => {
    console.log('getting jobs');

    Job.findAll({}, (err, jobs) => {
        if (err) {
            console.error(err);
            return;
        };
        res.json(jobs);
    });
});

//Gets one job by id
router.get('/jobs/:jobid', (req, res) => {
    console.log('getting one job by job id');

    Job.findOne({
        where: {
            _id: mongoose.Types.ObjectId(req.params.jobid)
        }
    }, (err, job) => {
        if (err) {
            console.error(err);
            return;
        };
        res.json(job);
    });
});

//Gets all jobs by user id
router.get('/user/jobs', (req, res) => {
    console.log('getting jobs by user');

    User.findOne({
        where: {
            _id: mongoose.Types.ObjectId(req.user._id)
        }
    }).populate('jobs')
    .then(user => {
        res.json(user);
    })
    .catch(e => {
        console.error(e);
    });
});

//Creates a new job
router.post('/jobs', (req, res) => {
    let newJob = req.body;
    Job.create(newJob, (err, response) => {
        if (err) {
            console.error(err);
            return;
        };
        res.json(response);
    });
});

//Updates one job with any field(s)
router.put('/jobs/:id', (req, res) => {
    Job.findOneAndUpdate({
        where: {
            _id: mongoose.Types.ObjectId(req.params.id)
        }
    }, req.body, {new: true})
    .then(response => {
        res.json(response);
    })
    .catch(e => console.error(e));
});

//Pushes accepted job to user jobs array and 
//adds user id to shoveler field in job
router.put('/user/jobs/add/:jobid', (req, res) => {
    Job.findOneAndUpdate({
        where: {
            _id: mongoose.Types.ObjectId(req.params.jobid)
        }
    }, {
        shoveler: req.user._id
    }, { new: true })
    .then(job => {
        User.findOneAndUpdate({
            where: {
                _id: mongoose.Types.ObjectId(req.user._id)
            }
        }, {
            $push: {
                jobs: job._id
            }
        }, {new: true}, (err, response) => {
            if (err) {
                console.log(err);
                return;
            };
            res.json(response);
        });
    })
    .catch(e => console.error(e));
});

//Delete section for the future