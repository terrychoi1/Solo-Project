//Importing react
//npm install react
import React from 'react';
//Need render method from react-dom
//npm install react-dom
import { createRoot } from 'react-dom/client';

//Need App.jsx component
import App from './Components/App.jsx';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App/>);