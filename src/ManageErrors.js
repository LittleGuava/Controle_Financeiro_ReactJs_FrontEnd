import PubSub from 'pubsub-js';

export default class ManageErrors{
	//pacoca=erros
	//thiaguinho=erro
	publishErrors(pacoca){
		for(var i=0; i<pacoca.errors.full_messages.length/*AQUI TAVA ERRADO*/; i++){
			var thiaguinho = pacoca.errors.full_messages[i];
			console.log(thiaguinho);
			PubSub.publish("erro-validacao", thiaguinho);
		}
	}

	publishErrorsValidation(erros){
		for(var i=0; i<erros.errors.length; i++){
			var erro = erros.errors[i];
			console.log(erro);
			PubSub.publish("erro-validacao-login", erro);
		}
	}

	publishErrorsGE(erros){
		for(var i=0; i<erros.errors.description.length; i++){
			var erro = erros.errors.description[i];
			console.log(erro);
			PubSub.publish("erro-validacao-GE", erro);
		}
	}
}