var xJog;
var yJog;
var xObj = [13];
var yObj = [13];
var xTiros = [10];
var yTiros =  [10];
var xBonus1;
var yBonus1;
var xBonus2;
var yBonus2;
var balaBoa = [10];
var tiroAtual;
var dificuldade;
var vidas;
var pontuacao;
var vez = [5];
var municao;
var inimigos;
var tela = 1;
var configuracao = 1;
var tirosDisponiveis = 0;
var explosao = 1;
var animacao = 0;
var xExp, yExp;

function preload() {
  nave = loadImage('nave.jpeg');
  asteroide = loadImage('asteroide.jpeg');
  explosao1 = loadImage('explosao1.jpg');
  explosao2 = loadImage('explosao2.jpg');
  explosao3 = loadImage('explosao3.jpg');
}

function setup() {
  createCanvas(800, 600);
  imageMode(CENTER);
  xBonus1 = 0;
  yBonus1 = -100;
  xBonus2 = 2000;
  yBonus2 = -100;
  xJog = 400;
  yJog = 550;
  tiroAtual = 0;
  vidas = 5;
  pontuacao = 0;
  dificuldade = 3;
}

function draw() {

  if(tela === 1){ // tela do menu
    background(0); // DESENHA A TELA
    fill(255);
    textSize(50);
    text('GTA 6', 350, 100);
    fill(255, 0, 0);
    textSize(20);
    text('1 - Jogar', 80, 400);
    text('2 - Instruções', 80, 420);
    text('3 - Selecionar dificuldade', 80, 440);
    fill(51, 51, 204);
    text('Dificuldade atual: ', 80, 500);
    text(dificuldade, 265, 500);
    text('/5', 280, 500);
  }

  else if(tela === 2){ // tela do jogo

    /* CONFIGURAÇÕES INICIAS */
    if(configuracao === 1){
      if(dificuldade === 1){
        dificuldade = 'Muito facil';
        municao = 10;
        inimigos = 10;
      } 
      else if(dificuldade === 2){
        dificuldade = 'Facil';
        municao = 9;
        inimigos = 17;
      } 
      else if(dificuldade === 3){
        dificuldade = 'Medio';
        municao = 8;
        inimigos = 21;
      } 
      else if(dificuldade === 4){
        dificuldade = 'Dificil';
        municao = 7;
        inimigos = 25;
      } 
      else{
        dificuldade = 'Muito Dificil';
        municao = 5;
        inimigos = 30;
      } 
      createCanvas(800, 600);
      for(var i=0; i<municao; i++){
        xTiros[i] = -100;
        yTiros[i] = -100;
        balaBoa[i] = 0;
      }
      for(var i=0; i<inimigos; i++){
        xObj[i] = random(0, 750);
        yObj[i] = random(0, 40);
      }
      configuracao = 2;
    }

    background(0); // DESENHA A TELA

    /* DESENHO DO JOGADOR */
    fill(0, 0, 255);
    image(nave, xJog, yJog, 46, 46);

     /* DESENHO DO OBSTÁCULO */
    fill(0, 255, 0)
    for(var i=0; i<inimigos; i++){
      image(asteroide, xObj[i], yObj[i], 30, 30);
    }

    /* DESENHO DOS TIROS */
    fill(255, 0, 0)
    for(var i=0; i<municao; i++)
      ellipse(xTiros[i], yTiros[i], 10, 10);

    /* DESENHO DOS BÔNUS */
    fill(204, 0, 153);
    ellipse(xBonus1, yBonus1, 15, 15);
    fill(102, 0, 102);
    ellipse(xBonus2, yBonus2, 15, 15);

    /* MOVIMENTAÇÃO DO JOGADOR */
    if (keyIsDown(LEFT_ARROW) && xJog > 15)
      xJog-=5;

    if (keyIsDown(RIGHT_ARROW) && xJog < 785)
      xJog+=5;

    if (keyIsDown(UP_ARROW) && yJog > 15)
      yJog-=5;

    if (keyIsDown(DOWN_ARROW) && yJog < 585)
      yJog+=5;

    /* MOVIMENTAÇÃO DO OBSTÁCULO */
    for(var i=0; i<inimigos; i++){
      yObj[i]+=5;
      if(yObj[i] > 750){
        xObj[i] = random(0, 750);
        yObj[i] = random(0, 40);
      }
    }

    /* MOVIMENTAÇÃO DOS TIROS */ 
    for(var i=0; i<municao; i++){
      if(yTiros[i] < 0){
        xTiros[i] = -100;
        yTiros[i] = -100;
        balaBoa[i] = 0;
      }
      yTiros[i] -=5; 
    }

    /* MOVIMENTAÇÃO DOS BÔNUS */
    xBonus1+=7;
    if(xBonus1 > 6000){
      xBonus1 = 0;
      yBonus1 = random(0, 750);
    }
    xBonus2+=12;
    if(xBonus2 > 20000){
      xBonus2 = 0;
      yBonus2 = random(0, 750);
    }

    /* MUNIÇÃO */
    for(var i=0; i<municao; i++){
      if(balaBoa[i] === 0){
        tirosDisponiveis++;
      }
    }

    /* INFORMAÇÕES NA TELA */
    fill(255);
    textSize(13);
    text('Dificuldade:', 10, 30);
    text(dificuldade, 90, 30);
    text('Vidas:', 370, 30);
    text(vidas, 413, 30);
    text('Pontuacao:', 700, 30);
    text(pontuacao, 775, 30);
    text('Municao Disponivel:', 20, 580);
    fill(255, 0, 0);
    text(tirosDisponiveis, 155, 580);
    tirosDisponiveis = 0;

    /* COLISÃO ENTRE JOGADOR E OBSTÁCULOS */
    for(var i=0; i<inimigos; i++){
      if(xJog-15<=xObj[i]+25 && xJog+15>= xObj[i] && yJog-15 <= yObj[i]+25 && yJog+15 >= yObj[i]){
        vidas --;
        xObj[i] = random(0, 750);
        yObj[i] = 20;
      }
    }

    /* COLISÃO ENTRE OBSTÁCULOS E TIROS */
    for(var i=0; i<municao; i++){
      for(var j=0; j<inimigos; j++){
        if(xTiros[i]<=xObj[j]+15 && xTiros[i]>= xObj[j]-15 && yTiros[i] <= yObj[j]+15 && yTiros[i] >= yObj[j]-15){
          pontuacao++;
          xExp = xObj[j];
          yExp = yObj[j];
          xObj[j] = random(0, 750);
          yObj[j] = 20;
          xTiros[i] = -100;
          yTiros[i] = -100;
          balaBoa[i] = 0;
          animacao = 1;
        }
      }
    }

    /* ANIMAÇÃO DAS EXPLOSÕES */
    if(animacao === 1){
      if(explosao <= 8){
        image(explosao1, xExp,  yExp, 30, 30);
        explosao++;
      }
      else if(explosao <= 16){
        image(explosao2, xExp,  yExp, 30, 30);
        explosao++;
      }
      else{
        image(explosao3, xExp,  yExp, 30, 30);
        explosao++;
        if(explosao>24){
           animacao = 0;
           explosao = 1;
        } 
      }
    }

    /* COLISÃO ENTRE JOGADOR E BÔNUS */
    if(xBonus1 <=xJog+15 && xBonus1 >= xJog-15 && yBonus1 <= yJog+15 && yBonus1 >= yJog-15){
      pontuacao+=3;
      xBonus1 = 1000;
    }
    if(xBonus2 <=xJog+15 && xBonus2 >= xJog-15 && yBonus2 <= yJog+15 && yBonus2 >= yJog-15){
      vidas++;
      xBonus2 = 1000;
    }

    /* CHECAGEM DO GAME OVER */
    if(vidas === -1){
      tela = 4;
    }

  }

  else if(tela === 3){ // tela das instruções
    background(0); // DESENHA A TELA
    fill(255);
    textSize(50);
    text('INSTRUÇÕES', 270, 100);
    textSize(13);
    fill(0, 255, 0);
    text('1 - ', 15, 400);
    fill(255, 0, 0);
    text('Pressione as setas para mover a nave e barra de espaço para atirar.', 35, 400);
    fill(0, 255, 0);
    text('2 - ', 15, 420);
    fill(255, 0, 0);
    text('Chegue o mais longe possível desviando dos asteróides ou destruindo-os. Destrua-os para acumular pontos.', 35, 420);
    fill(0, 255, 0);
    text('3 - ', 15, 440);
    fill(255, 0, 0);
    text('Tente coletar os bônus de pontuação (rosa) e de vida (roxo) para sobreviver por mais tempo e acumular mais pontos.', 35, 440);
    fill(51, 51, 204);
    text('Pressione F5 para voltar ao menu!', 15, 480);
  }
  else if(tela === 4){ // tela do game over
    background(0); // DESENHA A TELA
    fill(255);
    textSize(80);
    text('GAME OVER', 180, 200);
    fill(255, 0, 0);
    textSize(20);
    text('Pressione F5 para jogar novamente!', 80, 400);
  }
}

function keyPressed() {
  /* KEYCODE 32 REPRESENTA A BARRA DE ESPAÇO (TIRO) */
  if (keyCode === 32) {
    if(balaBoa[tiroAtual] === 0){
      xTiros[tiroAtual] = xJog;
      yTiros[tiroAtual] = yJog - 20;
     balaBoa[tiroAtual] = 1;
     tiroAtual++;
     if(tiroAtual === municao) tiroAtual = 0;
   }
  } 
  if(tela === 1){
    if(keyCode === 49){
      tela = 2;
    }
    else if(keyCode === 50){
      tela = 3;
    }
    else if(keyCode === 51){
      dificuldade = parseInt(prompt("Escolha a dificuldade do jogo\n1 - Muito facil\n2 - Facil\n3 - Medio\n4 - Dificil\n5 - Muito dificil"));
      tela = 1;
    }
  }
}