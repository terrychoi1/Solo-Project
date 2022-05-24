//Using express to create server
//npm install express
const express = require('express');
//app is the server
const app = express();
const path = require('path');

//Parse all data for express to handle
app.use(express.json());

//Using router to handle all 4 functionalities
const taskRouter = require('./routes/task');

//Declaring port number for easy view
const PORT = 3000;

//Serving all the front end stuff
app.use(express.static(path.resolve(__dirname, '../Front-end')));

//Setting up the router
app.use('/task', taskRouter);

//Catch all error handler
app.use((req,res)=>{
    return res.status(404).header('text/html').sendFile(path.resolve(__dirname,'../404.html'));
});

//Global error handler
app.use((err, req, res, next)=>{
    //Set the default error
    const defaultError = {
        status: 400,
        log: 'Global Error handler activated',
        message: 'You done goofed'
    };
    //Overwrite the default error with the incoming error
    const finalError = Object.assign(defaultError, err);

    //Log the error in the server and send back the error message
    console.log(finalError.log);
    return res.status(finalError.status).json(finalError.message);
});

//Starting the server!
app.listen(PORT, ()=> console.log(`Server is listening on port : ${PORT}!`));

//Export the module
module.exports = app;