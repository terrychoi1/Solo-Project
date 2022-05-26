import React from 'react';

const UncompletedTask = ({taskId, taskInfo, deleteTask, completeTask}) => {
    return(
    <div>
        <ul>
            <li><b>Description : </b>{taskInfo.description}</li>
            <li><b>Due Date : </b>{taskInfo.dueDate}</li>
            <li><b>Priority : </b>{taskInfo.priority}</li>
        </ul>
        <button onClick = {() => completeTask(taskId)}>Completed!</button>
        <button onClick={() => deleteTask(taskId)}>Delete!</button>
  </div>
  );
}


export default UncompletedTask;