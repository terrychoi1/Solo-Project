//Using express to create server
//npm install express
const express = require('express');
//app is the server
const app = express();
const path = require('path');

//Using mongoose as database
//npm install mongoose
const mongoose = require('mongoose');

//Connect to Mongodb
const mongoURI = 'mongodb+srv://practice:qwerty13579@cluster0.ds4ax.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoURI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'terryssoloproject'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

//Parse all data for express to handle
app.use(express.json());

//Using router to handle all 4 functionalities
const taskRouter = require('./routes/taskRouter');

//Declaring port number for easy view
const PORT = 3000;

//Serving all the front end stuff with the bundle generated from webpack ONLY when it's in production mode
if (process.env.NODE_ENV === 'production') {
    // statically serve everything in the build folder on the route '/build'
    app.use('/Product', express.static(path.join(__dirname, '../Product')));
    // serve index.html on the route '/'
    app.get('/', (req, res) => {
        return res.status(200).sendFile(path.join(__dirname, '../Front-end/index.html'));
    });
};

//Setting up the router
app.use('/task', taskRouter);

//Catch all error handler
app.use((req,res)=>{
    return res.status(404).header('text/html').sendFile(path.resolve(__dirname,'../Front-end/404.html'));
});

//Global error handler
app.use((err, req, res, next)=>{
    //Set the default error
    const defaultError = {
        status: 400,
        log: 'Global Error handler activated',
        message: 'You done goofed in the global'
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