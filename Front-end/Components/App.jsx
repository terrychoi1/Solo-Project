//Importing react for front-end
import React, { Component } from 'react';

//Importing components for the application
import UncompletedTasks from './UncompletedTasksDisplay'
import CompletedTasks from './CompletedTasksDisplay'
import TaskCreator from './TaskCreator.jsx'
import TotalUncompletedTasks from './TotalUncompletedTasks.jsx';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      //Things to keep track of
      //Id's of all the tasks
      taskIds : [],
      //Information about each task
      taskInfo : {},
      //Total Number of Uncompleted tasks
      totalNumberOfUncompleted : 0,
      //Id's of all uncompleted tasks
      uncompletedTasksById: [],
      //Id's of all completed tasks
      completedTasksById: [],

    };
    //List of functionalities to passdown and bind
    this.handleData = this.handleData.bind(this);
    this.addTask = this.addTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.completeTask = this.completeTask(this);

  };
  //Logic needed to display the page once React updates the DOM
  async componentDidMount(){
    try{  
      //Make a get request to the db to set the state
      const response = await fetch('/task');
      const tasks = await response.json();
      const { taskIds, taskInfo, totalNumberOfUncompleted, uncompletedTasksById, completedTasksById } = this.handleData(tasks);
      return this.setState({ taskIds, taskInfo, totalNumberOfUncompleted, uncompletedTasksById, completedTasksById })
    }
    catch(err){
      return console.log(err)
    }
  };

  //Logic for the functionalities listed in the constructor
  //How to handle the data
  handleData(tasks , state = this.state ){
    const { taskIds, taskInfo, totalNumberOfUncompleted, uncompletedTasksById, completedTasksById } = state;
    
    tasks.forEach(function(task){
      taskIds.push(task._id);
      const { description, dueDate, priority, completed } = task;
      taskInfo[task._id] = { description, dueDate, priority, completed };
      if (task.completed === 0){
        totalNumberOfUncompleted++;
        uncompletedTasksById.push(task._id);
      }
      else if (task.completed === 1) completedTasksById.push(task._id);
    })
    return { taskIds, taskInfo, totalNumberOfUncompleted, uncompletedTasksById, completedTasksById }
  }

  //Adding a new task
  addTask(task){
    const { uncompletedTask, totalNumberOfUncompleted, taskIds, taskInfo } = handleData(task);
    this.setState({ uncompletedTask, totalNumberOfUncompleted, taskIds, taskInfo })
    return;
  }

  //Deleting a task
  async deleteTask(id){
    const response = await fetch(`/task/${id}`, {
      method: 'DELETE',
      headers: {'Content-type':'application/x-www-form-urlencoded'}
    });
    const tasks = await response.json();
    const { taskIds, taskInfo, totalNumberOfUncompleted, uncompletedTasksById, completedTasksById } = this.handleData(tasks);
    return this.setState({ taskIds, taskInfo, totalNumberOfUncompleted, uncompletedTasksById, completedTasksById })
  }

  //Completing a task
  async completeTask(id){
    const response = await fetch(`/task/${id}`, {
      method: 'PATCH',
      body: { 'completed' : 1 },
      headers: {'Content-type':'application/x-www-form-urlencoded'}
    });
    const tasks = await response.json();
    const { taskIds, taskInfo, totalNumberOfUncompleted, uncompletedTasksById, completedTasksById } = this.handleData(tasks);
    return this.setState({ taskIds, taskInfo, totalNumberOfUncompleted, uncompletedTasksById, completedTasksById })
  }

  //Actually rendering the page
  render(){
    const props = {
      taskIds : this.state.taskIds,
      taskInfo : this.state.taskInfo,
      totalNumberOfUncompleted : this.state.totalNumberOf,
      uncompletedTasksById: this.state.uncompletedTasksById,
      completedTasksById: this.state.completedTasksById
    };

    return (
      <div>
        <main>
          <div>
          <TaskCreator 
          { ...props }
          addTask = { this.addTask } 
          />
          <TotalUncompletedTasks
          totalNumberOfUncompleted = {this.state.totalNumberOfUncompleted}
          />
          <UncompletedTasks
          {...props}
          deleteTask = {this.deleteTask}
          completeTask = {this.completeTask}
          />
          <CompletedTasks
          {...props}
          deleteTask = {this.deleteTask}
          />
          </div>
        </main>
      </div>
    )
  }
}

export default App;