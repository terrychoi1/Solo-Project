//Writing in express
const express = require('express');
//This file serves as a router
const router = express.Router();
//Import the taskController to handle the requests
const taskController = require('../Controllers/taskController');

router.get('/', taskController.getAllTasks, (req,res)=>{
    return res.status(200).send(res.locals.allTasks);
});

router.get('/uncompleted', taskController.getTaskUncompleted, (req,res)=>{
    return res.status(200).send(res.locals.uncompletedTasks);
});

router.get('/completed', taskController.getTaskCompleted, (req,res)=>{
    return res.status(200).send(res.locals.completedTasks);
});

router.post('/', taskController.createTask, (req,res)=> {
    return res.status(200).send(res.locals.newTaskList);
});

router.put('/:id', taskController.updateTask, (req,res)=> {
    return res.status(200).send(res.locals.updatedUncompletedTaskList);
});

router.patch('/:id', taskController.completedTask, (req,res)=> {
    return res.status(200).send(res.locals.updatedCompletedTaskList);
});

router.delete('/:id', taskController.deleteTask, (req,res)=> {
    return res.status(200).send('Task Deleted');
});

//Export as a router
module.exports = router;