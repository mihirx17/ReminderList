const express = require('express');
const router = express.Router();
const Task = require('./Model/usertask');   

// Define your API routes here
router.get('/reminders', (req, res) => {
    res.json({ message: 'GET /reminders' });
});

router.post('/addReminders', (req, res) => {
    const task = new Task({
        task: req.body.task,
        date: req.body.date,
        time: req.body.time,
        status: req.body.status
    });

    task.save().then((data) => {
        res.status(200).json({ message: "Task added successfully", data: data });
    }).catch((error) => {
        res.status(500).json({ message: error.message });
    });
});

module.exports = router;