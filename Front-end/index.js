//Importing react
//npm install react
import React from 'react';
//Need render method from react-dom
//npm install react-dom
import { render } from 'react-dom';

//Need App.jsx component
import App from './Components/App.jsx';

//Need react-router-dom to interact with 
//npm install react-router-dom
import { BrowserRouter } from 'react-router-dom';


render(
    < BrowserRouter >
      <App/>
    </BrowserRouter>,
    document.getElementById('root')
);