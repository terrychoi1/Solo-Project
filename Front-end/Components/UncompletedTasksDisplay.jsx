//Importing react for front-end
import React from 'react';

const UncompletedTasks = ({ taskIds, taskInfo, totalNumberOfUncompleted, uncompletedTasksById, completedTasksById, deleteTask, completeTask}) => {
    const uncompletedTasks = [];
    for (let i = 0; i < uncompletedTasksById.length; i++){
        uncompletedTasks.push(<Task
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