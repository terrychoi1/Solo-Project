//Import the Task model
const Task = require('../Models/taskModel');

//Build the taskController object with various methods to handle different types of requests for the task router
const taskController = {
    //Methods
    getTask (req,res,next){
        try{
            Task.find(
                
            )
        }
        catch(err){
            return next({
                status: 401,
                log: 'taskController.getTask error!!',
                message: 'You done goodfed in the taskController.getTask'
            })
        };
    }
};

//Export the module
module.exports = taskController;