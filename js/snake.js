let lastRenderTime = 0;
const gameBoard = document.getElementById('game-board')

//snake speed moves x time(s) per second
const SNAKE_SPEED = 3;
const snakeBody = [{ x: 11, y: 11}, {x: 10, y: 11}, {x: 9, y: 11}];
const momentum = {x: 1, y: 0}

//add keyobard listener to page
window.addEventListener('keydown', handleKeyPress)
let lastKeyPressed = '';

function main(currentTime) {
    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;

    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return

    console.log("render")
    lastRenderTime = currentTime;

    update();
    render(gameBoard);
}

window.requestAnimationFrame(main);

// update logic of game
function update() {

    //move the snake

    const newSnakeHead = {
        x: snakeBody[0].x + momentum.x, 
        y: snakeBody[0].y + momentum.y
    }
    //add new head to snake body
    snakeBody.unshift(newSnakeHead)
    //"remove" last segment of snake body 
    snakeBody.pop()

    console.log('update')
}

//render game graphics
function render(gameBoard) {

    //clear previous render
    gameBoard.innerHTML = '';

    //render snake
    snakeBody.forEach(segment => {
        // create snake body
        const snakeElement = document.createElement('div')
        
        //position snake body
        snakeElement.style.gridRowStart = segment.y
        snakeElement.style.gridColumnStart = segment.x

        //add css to snake body
        snakeElement.classList.add('snake')

        //add snake body to array of snake body segments
        gameBoard.appendChild(snakeElement)
    })
}

function handleKeyPress(e) {
    const keyPress = e.key;

    switch(keyPress){
        case 'ArrowUp':
          momentum.x = 0;
          momentum.y = -1;
          break;
        case 'ArrowDown':
            momentum.x = 0;
            momentum.y = 1;
          break;
        case 'ArrowLeft':
            momentum.x = -1;
            momentum.y = 0;
          break;
        case 'ArrowRight':
            momentum.x = 1;
            momentum.y = 0;
          break;
    }

    lastKeyPressed = keyPress;
}
