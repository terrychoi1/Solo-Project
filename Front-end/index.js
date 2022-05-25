//Importing react
//npm install react
import React from 'react';
//Need render method from react-dom
//npm install -D react-dom
import { render } from 'react-dom';
import App from './Components/App.jsx';

render(
    <App/>,
    document.getElementById('root')
);