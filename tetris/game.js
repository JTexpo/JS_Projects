import {draw as blocksDraw, update as blocksUpdate} from './blocks.js';
import {draw as boardDraw, update as boardUpdate, go} from './board.js';

const BLOCK_SPD = 400;
let gameOver = false;
let lastRenderTime = 0;
const gameBoard = document.getElementById('game-board');

function main(currentTime){
    if (gameOver){ 
        if( confirm('You Lost. Press OKAY to RESTART') ){
            window.location = '/';
        }
    } else{
        const secondsSinceLastRender = (currentTime - lastRenderTime)/1000;
        window.requestAnimationFrame(main);
        if (secondsSinceLastRender < 1 / BLOCK_SPD){ return; }
        lastRenderTime = currentTime;
        update();
        draw();
        gameOver = go();
    }
}

window.requestAnimationFrame(main);


function update(){
    blocksUpdate();
    boardUpdate();
}
function draw(){
    gameBoard.innerHTML = '';
    blocksDraw(gameBoard);
    boardDraw(gameBoard);
}