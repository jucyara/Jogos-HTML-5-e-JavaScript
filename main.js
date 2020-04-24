let gameData = [ 
    [1,1,1,1,1,1,1,1,1,1,1,1,1], 
    [1,4,2,2,2,2,1,2,2,2,4,2,1], 
    [1,2,1,1,1,2,1,2,1,1,1,2,1], 
    [1,2,1,2,2,2,2,2,2,2,1,2,1], 
    [1,2,2,2,1,1,5,1,1,4,2,2,1], 
    [1,2,1,2,2,2,2,2,2,2,1,2,1], 
    [1,4,1,1,2,2,1,2,2,1,1,2,1], 
    [1,2,2,2,2,2,1,2,2,2,2,4,1], 
    [1,1,1,1,1,1,1,1,1,1,1,1,1]
  ];


// Especificamente, uma parede é representada pelo número 1,
// uma moeda é o número 2, terreno vazio é o número 3, 4 fantasma
// e Pacman é o número 5.

// Em nosso código abaixo, queremos poder nos referir a nomes de coisas,
// e não números. Para tornar isso possível, montamos alguns rótulos.
const WALL   = 1; //parede
const COIN   = 2; //moeda
const GROUND = 3; //terra
const FANTASMA = 4; //fantasma
const PACMAN = 5; //pacman


// Usaremos o identificador "map" para nos referir ao mapa do jogo.
// Não atribuiremos isso até mais tarde, quando o gerarmos
// usando o gameData.
let map; //mapa

// Precisamos acompanhar a localização de Pacman no tabuleiro do jogo.
// Isso é feito através de um par de coordenadas.
// E acompanharemos a direção que ela está seguindo.
let pacman = {
  x: 6,
  y: 4,
  direction: 'right'
};


// -------------------------------------------------------------
// Funções de criação de mapas de jogos
// -------------------------------------------------------------
// Esta função converte gameData em elementos DOM.
function createTiles(data) {

  // Manteremos os elementos DOM em uma matriz.
  let tilesArray = [];

  // Vamos dar uma linha de cada vez ...
  for (let row of data) {

    // Então olhe para cada coluna nessa linha.
    for (let col of row) {

      // Criamos um bloco de jogo como um elemento div.
      let tile = document.createElement('div');

      // Atribuímos a cada bloco o nome da classe.
      tile.classList.add('tile');

      // Agora, dependendo do valor numérico,
      // precisamos adicionar uma classe mais específica.
      if (col === WALL) {
        tile.classList.add('wall');

      } else if (col === COIN) {
        tile.classList.add('coin');

      } else if (col === GROUND) {
        tile.classList.add('ground');

      }else if (col === FANTASMA) {
        tile.classList.add('fantasma');

      } else if (col === PACMAN) {
        tile.classList.add('pacman');

        // Para Pacman, adicionaremos mais uma
        // classe para a direção que o pacman está enfrentando.
        tile.classList.add(pacman.direction);

      }

      // Agora que nosso bloco individual está configurado,
      // nós o adicionamos ao tilesArray.
      tilesArray.push(tile);
    }

    // Quando atingimos o final de uma linha, criamos um elemento br,
    // que informa ao navegador para criar uma quebra de linha na página.
    let brTile = document.createElement('br');

    //Em seguida, adicionamos esse elemento br ao tilesArray.
    tilesArray.push(brTile);
  }

  // No final de nossa função, retornamos a matriz
  // de blocos configurados.
  return tilesArray;
}

// Esta função cria um elemento do mapa, preenche-o com blocos,
// e adiciona-o à página.
function drawMap() {
  map = document.createElement('div');

  let tiles = createTiles(gameData);
  for (let tile of tiles) {
    map.appendChild(tile);
  }

  document.body.appendChild(map);
}

// Esta função remove o elemento do mapa da página.
function eraseMap() {
  document.body.removeChild(map);
}

// ------------------------------------------------- ------------
// Funções de movimento
// ------------------------------------------------ -------------

// Cada função faz o seguinte:
// - define a direção do pacman para mostrarmos a imagem correta
// - verifique se atingimos uma parede
// - se não batermos em uma parede, defina o local antigo do pacman como espaço vazio
// - atualiza a localização do pacman
// - desenha pacman no novo local

function moveDown() { //DESCE
  pacman.direction = 'down';
  if (gameData[pacman.y+1][pacman.x] !== WALL) {
    gameData[pacman.y][pacman.x] = GROUND;
    pacman.y = pacman.y + 1 ;
    gameData[pacman.y][pacman.x] = PACMAN;
  }
}

function moveUp() {
  pacman.direction = 'up'; //SOBE
  if (gameData[pacman.y-1][pacman.x] !== WALL) {
    gameData[pacman.y][pacman.x] = GROUND;
    pacman.y = pacman.y - 1;
    gameData[pacman.y][pacman.x] = PACMAN;
  }
}

function moveLeft() { //ESQUERDA
  pacman.direction = 'left';
  if (gameData[pacman.y][pacman.x-1] !== WALL) {
    gameData[pacman.y][pacman.x] = GROUND;
    pacman.x = pacman.x - 1 ;
    gameData[pacman.y][pacman.x] = PACMAN;
  }
}

function moveRight() { //DIREITA
  pacman.direction = 'right';
  if (gameData[pacman.y][pacman.x+1] !== WALL) {
    gameData[pacman.y][pacman.x] = GROUND;
    pacman.x = pacman.x + 1 ;
    gameData[pacman.y][pacman.x] = PACMAN;
  }
}

// Esta função configura o ouvinte para a página inteira.
// Especificamente, quando o usuário pressiona uma tecla, executamos uma função
// que lida com a tecla pressionada.
function setupKeyboardControls() {
  document.addEventListener('keydown', function (e) {

    // No que diz respeito ao navegador, cada tecla do teclado
     // está associado a um valor numérico.
     // Após algumas experiências, você pode descobrir quais valores numéricos
     // corresponde às teclas de seta.

     // Cada vez que o usuário se move, recalculamos a localização de Pacman,
     // atualize o
    if (e.keyCode === 37) {         // left arrow is 37
      moveLeft();

    } else if (e.keyCode === 38) {  // up arrow is 38
      moveUp();

    } else if (e.keyCode === 39){   // right arrow is 39
      moveRight();

    } else if (e.keyCode === 40){   // down arrow is 40
      moveDown();
    }

    // Depois de cada movimento, apagamos o mapa e o redesenhamos.
    eraseMap();
    drawMap();
  });
}

// ------------------------------------------------ -------------
// Função principal de configuração do jogo
// ------------------------------------------------ -------------
function main() {
  // Inicialize o jogo desenhando o mapa e configurando o
  // controles do teclado.
  drawMap();
  setupKeyboardControls();
}

// Finalmente, depois de definir todas as nossas funções, precisamos começar
// o jogo.
main();