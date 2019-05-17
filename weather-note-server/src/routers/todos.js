const express = require('express');
const bodyParser = require('body-parser');

const Todo = require('../models/todo.js');

const moment = require('moment');
const uuid = require('uuid');

const router = express.Router();
router.use(bodyParser.json());

// List
router.get('', (req, res) => {
    const filterMode = req.query.mode;
    const project = req.query.project;

    if (filterMode === 'all') {
        db.collection('todos').find({ project: project }).toArray((err, result) => {
            if (err)
                throw err;
            else
                res.json(result);
        });
    }
    else if (filterMode === 'active') {
        db.collection('todos').find({ doneTs: { $eq: null }, project: project }).toArray((err, result) => {
            if (err)
                throw err;
            else
                res.json(result);
        });
    }
    else if (filterMode === 'completed') {
        db.collection('todos').find({ doneTs: { $ne: null }, project: project }).toArray((err, result) => {
            if (err)
                throw err;
            else
                res.json(result);
        });
    }
    else {
        const err = new Error('Mode error.');
        err.status = 400;
        throw err;
    }

});

// Create
router.post('', (req, res) => {
    const id = uuid();
    const { text, date, project } = req.body;
    const ts = moment().unix();

    if (!text) {
        const err = new Error('Text are required');
        err.status = 400;
        throw err;
    }

    const todo = new Todo({ id, text, date, project, ts });
    todo.save(err => {
        if (err)
            throw err;
        else
            res.sendStatus(200);
    });
});

// Accomplish
router.post('/:id', async (req, res) => {
    const targetId = req.params.id;
    let isAccomplished;

    if (!targetId) {
        const err = new Error('Todo ID are required');
        console.log(err);
        res.sendStatus(400);
    }

    isAccomplished = await _checkAccomplished(targetId, res);

    if (isAccomplished) {
        try {
            await _updateAccomplishedTime(targetId, null);
        } catch (err) {
            console.log(err);
            res.sendStatus(400);
        }

        res.sendStatus(200);
    }
    else {
        const targetDoneTs = moment().unix();

        try {
            await _updateAccomplishedTime(targetId, targetDoneTs);
        } catch (err) {
            console.log(err);
            res.sendStatus(400);
        }

        res.sendStatus(200);
    }

});

const _checkAccomplished = async (targetId, res) => {

    const target = await db.collection('todos').findOne({ id: targetId });

    if (target === null) {
        const err = new Error('Todo not found.');
        err.status = 400;
        console.log(err);
        res.sendStatus(400);
    }

    if (target.doneTs === null)
        return false;
    else
        return true;
}

const _updateAccomplishedTime = (targetId, time) => {
    db.collection('todos').updateOne(
        { id: targetId },
        { $set: { doneTs: time } },
        err => {
            if (err)
                throw err;
        }
    );
}

// Delete
router.delete('/:id', function (req, res) {
    const targetId = req.params.id;

    if (!targetId) {
        const err = new Error('Todo ID are required');
        err.status = 400;
        throw err;
    }

    db.collection('todos').removeOne(
        { id: targetId },
        err => {
            if (err)
                throw err;
            else
                res.sendStatus(200);
        }
    );
});

module.exports = router;