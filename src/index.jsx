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
