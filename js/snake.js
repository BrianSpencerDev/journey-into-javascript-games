let lastRenderTime = 0;
const gameBoard = document.getElementById('game-board')

//snake speed moves x time(s) per second
const SNAKE_SPEED = 10;
const snakeBody = [{ x: 11, y: 11}, {x: 10, y: 11}, {x: 9, y: 11}];


const RIGHT = {x: 1, y: 0};
const LEFT = {x: -1, y: 0};
const DOWN = {x: 0, y: 1};
const UP = {x: 0, y: -1};

let momentum = RIGHT;

//add keyobard listener to page
let keyPressed;
window.addEventListener('keydown', event => { keyPressed = event.key })

function main(currentTime) {
    window.requestAnimationFrame(main)

    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;

    /*
        check to see if snake needs to move by checking if secondsSinceLasterRender
        is less than the time between renders
    */
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
    handleKeyPress(keyPressed);
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

function handleKeyPress(key) {

    switch(key){
        case 'ArrowUp':
            //do nothing if already going down or up
            if (momentum !== DOWN && momentum !== UP) {
                momentum = UP;
            }
            break;
        case 'ArrowDown':
            //do nothing if already going up or down
            if (momentum !== UP && momentum !== DOWN) {
                momentum = DOWN;
            }
            break;
        case 'ArrowLeft':
            //do nothing if already going right or left
            if (momentum !== RIGHT && momentum !== LEFT) {
                momentum = LEFT;
            }
            break;
            //do nohting if already going left or right
        case 'ArrowRight':
            if (momentum !== LEFT && momentum !== RIGHT) {
                momentum = RIGHT;
            }
            break;
    }
}
