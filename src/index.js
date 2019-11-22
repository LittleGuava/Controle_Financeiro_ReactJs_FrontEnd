import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import App from './App';
import UserBox from './User';
import Home from './Home';
import Dashboard from './Dashboard';
import Login from './Login';
import GainBox from './Gain';
import Expense from './Expense';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, Route}  from 'react-router-dom';

ReactDOM.render(
	(<Router>
		<Route path='/' component={App}/> 
		<Route path='/user' component={UserBox}/>
		<Route path='/gain' component={GainBox}/>
		<Route path='/expense' component={Expense}/>
		<Route path='/login' component={Login}/>
		<Route path='/dashboard' component={Dashboard}/>
		<Route exact path='/' component={Home}/>
	</Router>),
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
