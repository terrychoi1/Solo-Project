//Importing react for front-end
import React from 'react';

const CompletedTasks = ({ taskIds, taskInfo, totalNumberOfUncompleted, uncompletedTasksById, completedTasksById, deleteTask, completeTask}) => {
    const completedTasks = [];
    for (let i = 0; i < completedTasksById.length; i++){
        completedTasks.push(<Task
        taskId = {uncompletedTasksById[i]}
        taskInfo = {taskInfo[uncompltedTasksById[i]]}
        deleteTask = {deleteTask}
        completeTask = {completeTask}
        />);
    }

    return (
        <div>
            <header>To Do List</header>
            {uncompletedTasks}
        </div>
    );
}
export default UncompletedTasksDisplay;