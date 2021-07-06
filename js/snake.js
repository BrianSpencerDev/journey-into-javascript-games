let lastRenderTime = 0;
const gameBoard = document.getElementById('game-board')

//snake speed moves x time(s) per second
const SNAKE_SPEED = 2;
const snakeBody = [{ x: 11, y: 11}];
const momentum = {x: 1, y: 0}

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
    // snakeBody.forEach(segment => {
    //     segment.x = segment.x + momentum.x
    //     segment.y = segment.y + momentum.y
    // })

    console.log('update')
}

//render game graphics
function render(gameBoard) {

    //render snake
    snakeBody.forEach(segment => {
        // create snake body
        const snakeElement = document.createElement('div')
        
        //position snake body
        snakeElement.style.gridRowStart = segment.x
        snakeElement.style.gridColumnStart = segment.y

        //add css to snake body
        snakeElement.classList.add('snake')

        //add snake body to array of snake body segments
        gameBoard.appendChild(snakeElement)
    })
}