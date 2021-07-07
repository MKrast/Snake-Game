let canvas = document.getElementById("snake");

//Renderiza o que vai acontecer dentro do canvas
let context = canvas.getContext("2d"); 

//Tamanho dos quadrados
let box = 32; 
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

let direction = "right";
let food = {
    //Math.floor retira a parte flutuante de um número, torna o número inteiro
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG() {
    //Cor de fundo do jogo
    context.fillStyle = "lightgreen"; 
    
    //Desenha onde vai acontecer o jogo
    //São passados 4 parâmetros: x, y, altura e largura
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha(){
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

//Vai detectar quando a tecla for pressionada e atualizar a direção
document.addEventListener('keydown', update);

function update(event){
    //Todas as teclas tem um código. Os códigos a seguir são das setas do teclado
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarJogo(){
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('GAME OVER!!!');
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    }
    else{
        food.x = Math.floor(Math.random() * 15 + 1) * box,
        food.y = Math.floor(Math.random() * 15 + 1) * box
    }

    let newHead = {
        x: snakeX, 
        y: snakeY
    }

    //O método unshift() adiciona um ou mais elementos no início de um array e retorna o número de elementos (propriedade length) atualizado.
    snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 100);