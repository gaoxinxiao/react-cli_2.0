import '@babel/polyfill';
import ReactDOM from 'react-dom';
import * as React from 'react';
import App from "./App";
import { BrowserRouter as Router } from 'react-router-dom';
// import './index.css'


ReactDOM.render(<Router><App /></Router>,
   document.getElementById('root'));

