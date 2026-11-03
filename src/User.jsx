import React, {Component} from 'react';
import $ from 'jquery';
import InputCustomizado from './Componentes/InputCustomizado';
import PubSub from 'pubsub-js';
import ManageErrors from './ManageErrors';

export class UserForm extends Component {
		constructor(){
			super();
			this.state={lista:[], name:'', email:'', password:'', password_confirmation:''};
			this.enviaForm = this.enviaForm.bind(this);
			this.setName = this.setName.bind(this);
			this.setEmail = this.setEmail.bind(this);
			this.setPassword = this.setPassword.bind(this);
			this.setPassword_Confirmation = this.setPassword_Confirmation.bind(this);
			this.guardaDados={};
		}
		enviaForm(evento){
			evento.preventDefault();
			console.log("dados sendo enviados");

			$.ajax({
				url:"https://controle-financeiro-teste.herokuapp.com/api/auth" ,
				contentType: 'application/json',
				dataType: 'json',
				accept: 'application/vnd.projetofase8.v2',

				type: 'post',
				data: JSON.stringify({name:this.state.name,email:this.state.email,password:this.state.password, password_confirmation:this.state.password_confirmation}),

				success:function(resposta){
					console.log("Success!");
					console.log(resposta);

					$.each(resposta.data,function(index,value){
						this.guardaDados[index]=value;
					}.bind(this));

					setTimeout(function(){
						var novaLista= this.state.lista;
						novaLista.push(this.guardaDados);
						//this.setState({lista:novaLista});
						PubSub.publish('atualiza-lista-usuarios', novaLista);
						// como se fosse youtuber postando video :D
						alert("Cadastro efetuado com Sucesso!");
						this.state={lista:[], name:'', email:'', password:'', password_confirmation:''};
						this.guardaDados={};
					}.bind(this),10);


				}.bind(this),
				complete: function(resposta){

					console.log("Complete!");
					console.log(resposta.getAllResponseHeaders());

					this.guardaDados.token = resposta.getResponseHeader('access-token');
					this.guardaDados.client = resposta.getResponseHeader('client');
					this.guardaDados.uid = resposta.getResponseHeader('uid');

				}.bind(this), 

				error: function(resposta){
					console.log("Error!");
					if(resposta.status==422){
						new ManageErrors().publishErrors(resposta.responseJSON);
					}
				}


			})
		}
		setName(evento){
			this.setState({name:evento.target.value});
		}
		setEmail(evento){
			this.setState({email:evento.target.value});
		}
		setPassword(evento){
			this.setState({password:evento.target.value});
		}
		setPassword_Confirmation(evento){
			this.setState({password_confirmation:evento.target.value});
		}

		render(){
			return(
				<div>						
				<h1 className="h2">Cadastro de Usuários</h1>
				<form onSubmit={this.enviaForm} method="post">	

				<InputCustomizado type="text" id="name" name="name" value={this.state.name} onChange={this.setName} placeholder="Nome" label="Nome" />

				<InputCustomizado type="email" id="email" name="email" value={this.state.email} onChange={this.setEmail} placeholder="E-mail" label="Digite seu e-mail"/>

				<InputCustomizado type="password" id="password" name="password" value={this.state.password} onChange={this.setPassword} label="Digite a Senha" placeholder="Senha" />

				<InputCustomizado type="password" id="password_confirmation" name="password_confirmation" value={this.state.password_confirmation} onChange={this.setPassword_Confirmation} label="Confirme a senha" placeholder="Confirme a senha" />

				<button type="submit" className="btn btn-primary">Inscrever-se</button>

				</form>						
				</div>
				);
		}
}

export class UserTable extends Component {
	constructor(){
        super();
        this.state={lista:[]};
    }

    componentDidMount(){
    	PubSub.subscribe('atualiza-lista-usuarios', function(topico, novaLista){
    		this.setState({lista:novaLista});
    	}.bind(this))
    	PubSub.subscribe('erro-validacao', function(topico, erro){
    		alert(erro);
    	})
    }
	render(){
		return(
			<div className="table-responsive">
			<h2>Usuários</h2>
			<table className="table table-striped table-sm">
			<thead>
			<tr>
			<th>ID</th>
			<th>Name</th>
			<th>E-mail</th>
			</tr>
			</thead>
			<tbody>
			{
				this.state.lista.map(function(user){
					return(
						<tr key={user.id}>
						<td>{user.id}</td>
						<td>{user.name}</td>
						<td>{user.email}</td>
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

export default class UserBox extends Component {
	render(){
		return(
			<main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">

			<div>
				<UserForm/>
				<br/>
				<UserTable/>
			</div>
			

			</main>
			
		);
	}
}
