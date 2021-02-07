const express = require('express');
const Task = require('../models/task.js');
const router = new express.Router();
const auth = require('../middleware/auth.js');

// Create task
router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    });
    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
    // task.save().then(() => {
    //     res.status(201).send(task);
    // }).catch((error) => {
    //     res.status(400).send(error);
    // });
});

// GET /tasks?completed=false (use req query string)
// GET /tasks?limit=10 (limit no of results)
// GET /tasks?skip=10 (iterate over pages)
// E.g. skip=0, limit=10: get first page of results,
// skip=10, limit=10: get second page of results, etc
// GET /tasks?sortBy=createdAt:desc
router.get('/tasks', auth, async (req, res) => {
    try {
        // const tasks = await Task.find({owner: req.user._id});
        const match = {};
        if (req.query.completed) {
            match["completed"] = req.query.completed === "true"; // convert String to Boolean
        };
        const sort = {};
        if (req.query.sortBy) {
            const parts = req.query.sortBy.split(':');
            sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
        }
        const user = req.user;
        await user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit), // convert string to number
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate();
        const tasks = user.tasks;
        res.send(tasks);
    } catch (e) {
        res.status(500).send(e);
    }
    // Task.find({}).then((tasks) => {
    //     res.send(tasks);
    // }).catch((error) => {
    //     res.status(500).send();
    // });
});

// Get single task by id
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findOne({_id, owner: req.user._id}); // find task belonging to authenticated user
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
    // Task.findById(_id).then((task) => {
    //     if (!task) {
    //         return res.status(404).send();
    //     }
    //     res.send(task);
    // }).catch((error) => {
    //     res.status(500).send();
    // });
});

// Update individual task
router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });
    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid Updates!'});
    }

    try {
        const _id = req.params.id;
        const task = await Task.findOne({_id, owner: req.user._id});
        if (!task) {
            return res.status(404).send();
        };
        for (const property in req.body) {
            task[property] = req.body[property];
        };
        await task.save();
        res.send(task);
        // const task = await Task.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true});
        // if (!task) {
        //     return res.status(404).send();
        // }
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const _id = req.params.id;
        const task = await Task.findOne({_id, owner: req.user._id});
        if (!task) {
            return res.status(404).send();
        }
        await task.remove();
        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;