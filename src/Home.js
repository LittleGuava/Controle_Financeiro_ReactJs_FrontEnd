import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class Home extends Component {
	render(){
		return(
			<main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
				<br/>
				<div class="jumbotron jumbotron-fluid">
					<div class="container">
					<h1 class="display-4">Bem vindo ao sistema!</h1>
					<p class="lead"> Esse é um sistema de controle financeiro.</p>
					</div>
				</div>
			</main>
		)
	}
}