//Importing react for front-end
import React from 'react';

const TotalUncompletedTasks = ({ totalNumberOfUncompleted }) => {  
    return (
        <div>
            <p>
                <label>Total Uncompleted Tasks : </label>
                { totalNumberOfUncompleted }
            </p>
        </div>
    );
  }

    

export default TotalUncompletedTasks;