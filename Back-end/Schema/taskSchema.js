//Connect to mongodb
const mongoose = require('mongoose');
//Setting up the Schema for task
const Schema = mongoose.Schema;

//Set up the actually task model with specifications for each category
const taskSchema = new Schema({
    description: {type: String, require:true},
    priority: {type: Number, require: true},
    dueDate: {type: Number, require: true},
    completed: {type: Number, default: 0}
})

//Export model
module.exports = mongoose.model('Task', taskSchema);