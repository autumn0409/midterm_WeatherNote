const express = require('express');
const bodyParser = require('body-parser');

const Project = require('../models/projects');

const router = express.Router();
router.use(bodyParser.json());

// List
router.get('', (req, res) => {

    db.collection('projects').find().toArray((err, result) => {
        if (err)
            throw err;
        else
            res.json(result);
    });

});

// Create
router.post('', (req, res) => {
    const { name } = req.body;

    if (!name) {
        const err = new Error("Project's name is required");
        err.status = 400;
        throw err;
    }

    const project = new Project({ name });
    project.save(err => {
        if (err)
            throw err;
        else
            res.sendStatus(200);
    });
});

// Delete
router.delete('/:name', function (req, res) {
    const targetProject = req.params.name;

    if (!targetProject) {
        const err = new Error('Project name are required');
        err.status = 400;
        throw err;
    }

    db.collection('projects').removeOne(
        { name: targetProject },
        err => {
            if (err)
                throw err;
        }
    );

    db.collection('todos').deleteMany(
        { project: targetProject },
        err => {
            if (err)
                throw err;
            else
                res.sendStatus(200);
        }
    );
});

module.exports = router;