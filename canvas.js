function desenharCanvas() {
  tabuleiro.lineWidth = 8;
  tabuleiro.lineCap = "round";
  tabuleiro.lineJoin = "round";
  tabuleiro.fillStyle = "#161716";
  tabuleiro.strokeStyle = "#4AE309";
  tabuleiro.fillRect(0, 0, 1200, 800);
  tabuleiro.beginPath();
  tabuleiro.moveTo(550, 500);
  tabuleiro.lineTo(400, 500);
  tabuleiro.stroke();
  tabuleiro.closePath();
}

function desenharLinhas() {
  tabuleiro.lineWidth = 6;
  tabuleiro.lineCap = "round";
  tabuleiro.lineJoin = "round";
  tabuleiro.strokeStyle = "#4AE309";
  tabuleiro.beginPath();
  let largura = 750 / palavraSecreta.length;
  for (let i = 0; i < palavraSecreta.length; i++) {
    tabuleiro.moveTo(410 + largura * i, 640);
    tabuleiro.lineTo(460 + largura * i, 640);
  }
  tabuleiro.stroke();
  tabuleiro.closePath();
}
function escreverLetraCorreta(index) {
  tabuleiro.font = "normal 52px Space Mono";
  tabuleiro.lineWidth = 6;
  tabuleiro.lineCap = "round";
  tabuleiro.lineJoin = "round";
  tabuleiro.fillStyle = "#4AE309";
  let largura = 750 / palavraSecreta.length;
  tabuleiro.fillText(palavraSecreta[index], 419 + largura * index, 620);
  tabuleiro.stroke();
}

function escreverLetraIncorreta(letra, errorsLeft) {
  tabuleiro.lineWidth = 6;
  tabuleiro.font = "normal 40px Space Mono";
  tabuleiro.lineCap = "round";
  tabuleiro.lineJoin = "round";
  tabuleiro.fillStyle = "#4AE309";
  tabuleiro.fillText(letra, 535 + 40 * (10 - errorsLeft), 710, 40);
}

function desenharForca(pontos) {
  tabuleiro.lineWidth = 8;
  tabuleiro.lineCap = "round";
  tabuleiro.lineJoin = "round";
  tabuleiro.strokeStyle = "#4AE309";
  if (pontos === 8) {
    //poste lateral
    tabuleiro.moveTo(400, 500);
    tabuleiro.lineTo(400, 100);
  }
  if (pontos === 7) {
    //teto
    tabuleiro.moveTo(550, 100);
    tabuleiro.lineTo(400, 100);
  }
  if (pontos === 6) {
    //corda
    tabuleiro.moveTo(510, 100);
    tabuleiro.lineTo(510, 171);
  }
  if (pontos === 5) {
    //para cara
    tabuleiro.moveTo(557, 250);
    tabuleiro.arc(510, 230, 50, 0, Math.PI * 2);
  }
  if (pontos === 4) {
    //para corpo
    tabuleiro.moveTo(510, 389);
    tabuleiro.lineTo(510, 289);
  }
  if (pontos === 3) {
    //para perna esquerda
    tabuleiro.moveTo(510, 389);
    tabuleiro.lineTo(450, 450);
  }
  if (pontos === 2) {
    //para perna direita
    tabuleiro.moveTo(510, 389);
    tabuleiro.lineTo(560, 450);
  }
  if (pontos === 1) {
    //para mão izquerda
    tabuleiro.moveTo(510, 330);
    tabuleiro.lineTo(450, 389);
  }
  if (pontos === 0) {
    //para mão direita
    tabuleiro.moveTo(510, 330);
    tabuleiro.lineTo(580, 389);
  }
  tabuleiro.stroke();
  tabuleiro.closePath();
}

function exibirDerrota() {
  tabuleiro.font = "normal 42px Space Mono";
  tabuleiro.lineWidth = 6;
  tabuleiro.lineCap = "round";
  tabuleiro.lineJoin = "round";
  tabuleiro.fillStyle = "red";
  tabuleiro.fillText("Fim do jogo!", 630, 320);
}

function exibirVitoria() {
  tabuleiro.font = "normal 42px Space Mono";
  tabuleiro.lineWidth = 6;
  tabuleiro.lineCap = "round";
  tabuleiro.lineJoin = "round";
  tabuleiro.fillStyle = "green";
  tabuleiro.fillText("Ganhou,", 950, 320);
  tabuleiro.fillText("Parabéns!", 930, 360);
  setTimeout(recarregar, 1000);
}

function recarregar() {
  location.reload();
}
