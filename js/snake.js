let lastRenderTime = 0;
const gameBoard = document.getElementById('game-board');
let gameOver = false;

//snake speed moves x time(s) per second
const SNAKE_SPEED = 10;
const snakeBody = [{ x: 11, y: 11}, {x: 10, y: 11}, {x: 9, y: 11}];


const RIGHT = {x: 1, y: 0};
const LEFT = {x: -1, y: 0};
const DOWN = {x: 0, y: 1};
const UP = {x: 0, y: -1};
let momentum = RIGHT;

let score = 0;

//add keyobard listener to page
let keyPressed;
window.addEventListener('keydown', event => { keyPressed = event.key })

//generate initial food position
let food = generateFood();

function main(currentTime) {
    if (gameOver) {
        if (confirm('you lost :(   Press ok to restart')) {
            window.location = '/pages/snake.html';
        }

        return
    }

    window.requestAnimationFrame(main)

    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;

    /*
        check to see if snake needs to move by checking if secondsSinceLasterRender
        is less than the time between renders
    */
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return

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

    //When snake eats food generate new food
    if (isOnSnake(food)){
        food = generateFood();

        //increase score
        score++;
        
        //grow snake
        snakeBody.push(snakeBody[snakeBody.length - 1])
    }
    
    //check to see if snake is dead
    isDead();
}

//render game graphics
function render(gameBoard) {

    //clear previous render
    gameBoard.innerHTML = '';

    //render snake
    snakeBody.forEach(segment => {
        // create snake body
        renderElement('snake', segment);
    })

    //render food
    renderElement('food', food);

    //render score
    document.getElementById('score').textContent = score;

}

function renderElement(element, position){
    //create new element
    const newElement = document.createElement('div');

    //position element on grid
    newElement.style.gridRowStart = position.y;
    newElement.style.gridColumnStart = position.x;

    //add css styling to element
    newElement.classList.add(element);

    //add element to gameboard
    gameBoard.appendChild(newElement);
}

//gets random integer from 1 to max
function getRandomInt(max) {
    return Math.floor((Math.random() * max) + 1)
}

function getRandomGridCoordinate() {
    return {x: getRandomInt(21), y: getRandomInt(21)};
}

function isPositionEqual(pos1, pos2) {
    if(pos1.x === pos2.x && pos1.y === pos2.y){
        return true;
    }

    return false;
}

function isOnSnake(position) {
    return snakeBody.some(segment => {
        return isPositionEqual(segment, position)
    })
        
}

function generateFood() {
    const foodPos = getRandomGridCoordinate();

    //regen foodPos until it isnt on snake 
    while (isOnSnake(foodPos)) {
        foodPos = getRandomGridCoordinate();
    }

    return foodPos;
}

function outsideGrid(pos) {
    if (pos.x < 1 || pos.x > 21 || pos.y < 0 || pos.y > 21)
        return true
    
    return false
}

// function to check if snake has collided with itself
function snakeCollision() {
    return snakeBody.some((segment, index) => {
        if(index === 0)
            return false;
        return isPositionEqual(segment, snakeBody[0])
    })
}

function isDead() {
    if (snakeCollision() || outsideGrid(snakeBody[0]))
        gameOver = true;
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
