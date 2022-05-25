//Writing in express
const express = require('express');
//This file serves as a router
const router = express.Router();
//Import the taskController to handle the requests
const taskController = require('../Controllers/taskController');
//Require path for directory and file
const path = require('path');

router.get('/', taskController.getTasks, (req,res)=>{
    return res.status(200).end();
});

router.post('/', taskController.postTasks, (req,res)=> {
    return res.status(200).end();
});

router.update('/', taskController.updateTasks, (req,res)=> {
    return res.status(200).end();
});

router.delete('/', taskController.deleteTasks, (req,res)=> {
    return res.status(200).end();
});

//Export as a router
module.exports = router;