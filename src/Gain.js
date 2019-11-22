import React, {Component} from 'react';
import $ from 'jquery';
import InputCustomizado from './Componentes/InputCustomizado';
import PubSub from 'pubsub-js';
import ManageErrors from './ManageErrors';

class GainForm extends Component{
	constructor(){
		super();
		this.state = {lista:[], description:'', value:'', date:''};
		this.enviaForm=this.enviaForm.bind(this);
		this.setDescription = this.setDescription.bind(this);
		this.setValue = this.setValue.bind(this);
		this.setDate = this.setDate.bind(this);

		this.guardaDados = {};
	}

	enviaForm(evento){
		evento.preventDefault();
		console.log("dados sendo enviados");

		$.ajax({
			url:"https://controle-financeiro-teste.herokuapp.com/api/gains" ,
			contentType: 'application/json',
			dataType: 'json',
			accept: 'application/vnd.projetofase8.v2',

			type: 'post',
			data: JSON.stringify({description:this.state.description,value:this.state.value, date:''}),

			headers: {
				"access-token": sessionStorage.getItem('token'),
				"uid":  sessionStorage.getItem('uid'),
				"client":  sessionStorage.getItem('client'),
			},

			success: function(resposta){
				console.log("Success!");
				console.log(resposta);

				$.each(resposta.data.attributes,function(index,value){
					this.guardaDados[index] = value;
				}.bind(this));

				setTimeout(function(){
					var novaLista  = this.state.lista;
					novaLista.push(this.guardaDados);

					PubSub.publish('atualiza-lista-receitas', novaLista);
					alert("Receita cadastrada com sucesso!");
					this.setState({description:'', value:'', date:''});

					this.guardaDados = {};
				}.bind(this), 10);
			}.bind(this),

			complete: function(resposta){

				console.log("Complete!");
				console.log(resposta.getAllResponseHeaders());
				this.guardaDados.token=resposta.getResponseHeader('access-token');
				this.guardaDados.client=resposta.getResponseHeader('client');
				this.guardaDados.uid=resposta.getResponseHeader('uid');

				sessionStorage.setItem('token', this.guardaDados.token);				
				sessionStorage.setItem('client', this.guardaDados.client);
				sessionStorage.setItem('uid', this.guardaDados.uid);		

			}.bind(this),

			error: function(resposta){
				console.log("Error!");
				console.log(resposta);

				if(resposta.status === 401){
					new ManageErrors().publishErrorsValidation(resposta.responseJSON);
				}
				
				if(resposta.status === 422){
					new ManageErrors().publishErrorsGE(resposta.responseJSON);
				}
			},
		});
	}

	setDescription(evento){
		this.setState({description:evento.target.value});
	}
	
	setValue(evento){
		this.setState({value:evento.target.value});
	}
	
	setDate(evento){
		this.setState({date:evento.target.value});
	}

	render(){
		return(
			<div>
				<h1 class="h2">Cadastro de Receitas</h1>
				<form onSubmit={this.enviaForm} method="post">

					<InputCustomizado type="description" id="description" name="description" value={this.state.description} onChange={this.setDescription} placeholder="Descrição" label="Descrição"/>

					<InputCustomizado type="number" id="value" name="value" value={this.state.value} onChange={this.setValue} placeholder="Valor" label="Valor"/>

					<InputCustomizado type="date" id="date" name="date" value={this.state.date} onChange={this.setDate} placeholder="Data" label="Data"/>

					<button type="submit" class="btn btn-primary">Cadastrar</button>

				</form>
				</div> 
		)
	}
}

class GainTable extends Component{
	
	constructor(){
		super();
		this.state = {lista:[]};
	}

	componentDidMount(){

		PubSub.subscribe('atualiza-lista-receitas', function(topico, novaLista){
			this.setState({lista:novaLista});
		}.bind(this))

		PubSub.subscribe('erro-validacao-GE', function(topico, erro){
			alert(erro);
		})
	}
	render(){
		return(
			<div className="table-responsive">
				<h2>Receitas</h2>
				<table className="table table-striped table-sm">
					<thead>
						<tr>
							<th>ID</th>
							<th>Descrição</th>
							<th>Valor</th>
							<th>Data</th>
						</tr>
					</thead>
					<tbody>
					{
						this.state.lista.map(function(gain){
							return(
								<tr key={gain.id}>
									<td>{gain.id}</td>
									<td>{gain.description}</td>
									<td>{gain.value}</td>
									<td>{gain.date}</td>
								</tr>
							);

						})

					}
					</tbody>
				</table>
			</div>
		);
	}
}

export default class GainBox extends Component{
	render(){
		return (
			<main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
			<div>
				<GainForm/>
				<br/>
				<GainTable/>
			</div>
			</main>
		);
	}
}
