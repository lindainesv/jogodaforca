//Seletores
let tela = document.querySelector("canvas");
let botaoNovoJogoEscondido = (document.getElementById(
  "btn-novo-jogo"
).style.display = "none");
let botaoSairEscondido = (document.getElementById("btn-sair").style.display =
  "none");
let adicionarPalavra = (document.getElementById(
  "adicionar-palavra"
).style.display = "none");
let botaoNovoJogo = document.getElementById("btn-novo-jogo");
let botaoSair = document.getElementById("btn-sair");
let botaoCancelar = document.getElementById("btn-cancelar");

var palavras = [
  "ALURA",
  "FORCA",
  "HTML",
  "ORACLE",
 	"JAVASCRIPT",
  "LOGICA",
  "PROGRAMA",
  "DESAFIO",
];

var tabuleiro = document.getElementById("forca").getContext("2d");
var palavraSecreta = "";
var letras = [];
var palavraCorreta = "";
var erros = 8;
let letrasIncorretas = [];
let numeroDeErros = 8;
let letraEscolhida = [];

// captura o id "iniciar-juego" no momento do click e direciona ao método que inicia o jogo
document.getElementById("iniciar-jogo").onclick = () => {
  iniciarJogo();
};

// captura o id "btn-guardar", salva a palavra adicionada
document.getElementById("btn-salvar").onclick = () => {
  salvarPalavra();
};

// atualiza a tela quando o usuário clica em "novo jogo"
botaoNovoJogo.addEventListener("click", function () {
  location.reload();
});

// atualiza a tela quando o usuário clica em "sair"
botaoSair.addEventListener("click", function () {
  location.reload();
});

// atualiza a tela quando o usuário clica em "cancelar"
botaoCancelar.addEventListener("click", function () {
  location.reload();
});

//faz o sorteio da palavra
function escolherPalavraSecreta() {
  var palavra = palavras[Math.floor(Math.random() * palavras.length)];
  palavraSecreta = palavra;
  console.log(palavra);
  return palavra;
}

function verificarLetraCorreta(key) {
  if (letras.length < 1 || letras.indexOf(key) < 0) {
    letras.push(key);
    return false;
  } else {
    letras.push(key);
    return true;
  }
}

function adicionarLetraCorreta(i) {
  palavraCorreta += palavraSecreta[i].toUpperCase();
}

function adicionarLetraIncorreta(letter) {
  if (palavraSecreta.indexOf(letter) <= 0) {
    erros -= 1;
  }
}

function verificarFimDeJogo(letra) {
  //checa se a letra já foi incluída no array de letras certas ou erradas
  if (letraEscolhida.length < palavraSecreta.length) {
    //incluindo as letras já digitadas no array
    letrasIncorretas.push(letra);

    //valida se o usuário cometeu o número máximo de erros, para poder exibir a mesagem de fim de jogo
    if (letrasIncorretas.length > numeroDeErros) {
      exibirDerrota();
    } else if (letraEscolhida.length < palavraSecreta.length) {
      adicionarLetraIncorreta(letra);
      escreverLetraIncorreta(letra, erros);
    }
  }
}

//Verifica se o usuário ganhou
function verificarVencedor(letra) {
  letraEscolhida.push(letra.toUpperCase());
  if (letraEscolhida.length == palavraSecreta.length) {
    exibirVitoria();
  }
}

// faz com que os botões da tela de home desapareçam e mostra a tela de adicionar palavra
function mostrarTelaAdicionarPalavra() {
  document.getElementById("aparece-forca").style.display = "none";
  document.getElementById("adicionar-palavra").style.display = "block";
}

// salva a palavra que o usuário escreveu
function salvarPalavra() {
  //captura o que foi digitado
  let novaPalavra = document.getElementById("input-nova-palavra").value;

  // inclui a palavra digitada no array de palavras a serem sorteadas
  if (novaPalavra !== "") {
    palavras.push(novaPalavra.toUpperCase());
    alert("A palavra digitada foi salva");

    // faz a tela de adicionar palavra desaparecer
    document.getElementById("adicionar-palavra").style.display = "none";
    iniciarJogo();
  } else {
    alert("Nenhuma palavra foi digitada");
  }
}

function iniciarJogo() {
  document.getElementById("aparece-forca").style.display = "none";
  desenharCanvas();
  escolherPalavraSecreta();
  desenharLinhas();

  // impede que teclas como shift e outras sejam escritas
  function verificarLetra(keyCode) {
    if (typeof keyCode === "number" && keyCode >= 65 && keyCode <= 90) {
      return true;
    } else {
      return false;
    }
  }

  document.getElementById("btn-novo-jogo").style.display = "block";
  document.getElementById("btn-sair").style.display = "block";

  document.onkeydown = (e) => {
    let letra = e.key.toUpperCase();
    if (letrasIncorretas.length <= numeroDeErros) {
      if (!verificarLetraCorreta(e.key) && verificarLetra(e.keyCode)) {
        if (palavraSecreta.includes(letra)) {
          adicionarLetraCorreta(palavraSecreta.indexOf(letra));
          for (let i = 0; i < palavraSecreta.length; i++) {
            if (palavraSecreta[i] === letra) {
              escreverLetraCorreta(i);
              verificarVencedor(letra);
            }
          }
        } else {
          if (!verificarLetraCorreta(e.key) && !verificarVencedor(letra))
            return;
          desenharForca(erros);
          verificarFimDeJogo(letra);
        	}
      }
    } 
		else {
      alert("Você atingiu o limíte de letras incorretas a palavra correta era: "+ palavraSecreta);
    }
  };
}
