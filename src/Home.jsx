import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class Home extends Component {
	render(){
		return(
			<main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
				<br/>
				<div className="jumbotron jumbotron-fluid">
					<div className="container">
					<h1 className="display-4">Bem vindo ao sistema!</h1>
					<p className="lead"> Esse é um sistema de controle financeiro.</p>
					</div>
				</div>
			</main>
		)
	}
}