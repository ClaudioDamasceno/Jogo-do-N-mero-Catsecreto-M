//let titulo = document.querySelector('h1'); // Criar a variavel e selecionar a parte que vai ser alterada
//titulo.innerHTML = "Jogo do número secreto"; // Inserir o texto no HTML

//let paragrafo = document.querySelector('p'); // p é o nome da tag que tme no inicio do paragafo, assim, consegue selecionar  ele de forma correta.
//paragrafo.innerHTML = "Escolha um número entre 1 e 10";

// Codigo acima evoluiu para a parte de baxo

let listaDeNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;


function exibirTextoNaTela(tag, texto) { // a função vai mostrar o valor na tela. Não retorna valor
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2}); //escolhe o que vai ser lido, o tipo de voz e a velocidade. 
}

function exibirMensagemInicial() { 
    exibirTextoNaTela('h1', 'Jogo do número CATsecreto');
    exibirTextoNaTela('p', 'Adivinhe o número de 1 a 100 que o gato está "pensando"!');
}

exibirMensagemInicial();

function verificarChute() { // Dentro do index.html o verificarChute está associado ao botão (clicar)
    let chute = document.querySelector('input').value;
    //console.log(chute == numeroSecreto); // Informação vai ser mostrada na função console da página.
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++; //tentativas = tentativas + 1; //substituir pelo modelo de baixo
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    //return parseInt(Math.random() * 10 + 1); // a função return vai retornar o valor 
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) { //se a quantidade foir ingual ao numero total sortado, vai zerar a lista
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados)
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true)
}







