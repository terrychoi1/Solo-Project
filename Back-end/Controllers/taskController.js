//Import the Task model
const Task = require('../Schema/taskSchema');

//Build the taskController object with various methods to handle different types of requests for the task router
const taskController = {};


//Methods
//Get Method for displaying tasks that are uncompleted that are in the db
taskController.getTaskUncompleted = async (req, res, next) => {
    try{
        //find method to find all documents in the db
        const uncompletedTasks = await Task.find({ completed: 0});/* , (err, task) => {if (err) throw new Error('Error in creating task in db')});*/
        res.locals.uncompletedTasks = uncompletedTasks;
        return next();
    }
    catch(err){
        return next({
            status: 401,
            log: 'taskController.getTask error!!',
            message: 'You made an error in the taskController.getTask'
        })
    };
};

//Get Method for displaying tasks that are completed in the db
taskController.getTaskCompleted = async (req, res, next) => {
    try{
        //find method to find all documents in the db
        const completedTasks = await Task.find({ completed: 1});/* , (err, task) => {if (err) throw new Error('Error in creating task in db')});*/
        res.locals.completedTasks = completedTasks;
        return next();
    }
    catch(err){
        return next({
            status: 401,
            log: 'taskController.getTask error!!',
            message: 'You made an error in the taskController.getTask'
        })
    };
};

//Method for creating new tasks, new tasks will be uncompleted by default (completed = 0)
taskController.createTask = async (req, res, next) => {
    try{
        //Destructure the request to use in the create method
        const { description, priority, dueDate } = req.body;
        //create method to create a task with details to the db
        const newTask = await Task.create({ description, priority, dueDate })/* , (err) => {if (err) throw new Error('Error in creating task in db')});*/
        //send back the updated documents list
        const documents = await Task.find({ completed: 0});
        res.locals.newTaskList = documents;
        return next();
    }
    catch(err){
        return next({
            status: 402,
            log: 'taskController.createTask error!!',
            message: 'You made an error in the taskController.createTask'
        })
    };
};

//Method for updating the task
taskController.updateTask = async (req, res, next) => {
    try{
        //Pull id from request params
        const { id } = req.params
        //Deconstruct the request body to use in the findByIdAndUpdate
        const { description, priority, dueDate } = req.body;
        //find the document and update
        const updatedTask = await Task.findByIdAndUpdate(id, { description, priority, dueDate });
        const updatedUncompletedTaskList = await Task.find({ completed: 0 });
        res.locals.updatedUncompletedTaskList = updatedUncompletedTaskList;
        return next();
    }
    catch(err){
        return next({
            status: 401,
            log: 'taskController.updateTask error!!',
            message: 'You made an error in the taskController.updateTask'
        })
    };
};

//Method for indicating the task is completed
taskController.completedTask = async (req, res, next) => {
    try{
        //Pull id from request params
        const { id } = req.params
        //Deconstruct the request body to use in the findByIdAndUpdate
        const { completed } = req.body;
        //find the document and change the completed value to 1
        const completedTask = await Task.findByIdAndUpdate(id, {completed});
        const updatedCompletedTaskList = await Task.find({ completed: 1});
        res.locals.updatedCompletedTaskList = updatedCompletedTaskList;
        return next();
    }
    catch(err){
        return next({
            status: 401,
            log: 'taskController.completedTask error!!',
            message: 'You made an error in the taskController.completedTask'
        })
    };
};

//Method for deleting the selected task
taskController.deleteTask = async (req, res, next) => {
    try{
        //Pull the id of the delete request parameter
        const { id } = request.params;
        //Use the id constant to find the task by id and delete it
        const target = await Task.findByIdAndDelete(id); /* (err) => {if(err) throw new Error('Error in deleting in the db')}) */
        return next();
    }
    catch(err){
        return next({
            status: 401,
            log: 'taskController.deleteTask error!!',
            message: 'You made an error in the taskController.deleteTask'
        })
    };
};



//Export the module
module.exports = taskController;