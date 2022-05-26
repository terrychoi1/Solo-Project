//Importing react for front-end
import React, { Component } from 'react';

class TaskCreator extends Component {
    constructor(props){
        super(props);

        this.state = {
            description: '',
            dueDate: '',
            priority: ''
        };

        this.submit = this.submit.bind(this);
        this.inputField = this.inputField(this);
    }

    async submit(){
        const taskDetails = this.state;
        const response = await fetch('/task', {
            method: 'POST',
            headers: {'Content-type':'application/x-www-form-urlencoded'},
            body: taskDetails
        });
        const newTask = await response.json();
        return this.props.addTask(newTask)
    }

    inputField(event){
        const { property, value } = event.target;
        this.setState({ [property] : value });
    }

    render(){
        return(
            <div>
                <label>Description:</label>
                <input property='description' value={this.state.description} onChange={this.inputField} placeholder='Description of Your Task'/>
                <label>DueDate:</label>
                <input property='dueDate' value={this.state.dueDate} onChange={this.inputField} placeholder='Due Date of Your Task (Please input in (month).(day) form)'/>
                <label>Priority:</label>
                <input property='priority' value={this.state.priority} onChange={this.inputField} placeholder='How Important Is Your Task? Lower the number, higher the importance'/>
            </div>
        );
    }
};

export default TaskCreator;