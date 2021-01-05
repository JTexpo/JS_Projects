import { draw as drawPill, update as updatePill } from './pill.js'
import { draw as drawBoard, update as updateBoard } from './board.js';
import { update as updateVirus } from './virus.js';

let lastRenderTime = 0;
const BLOCK_SPD = 3;

let gameVars = {gameOver: false, gravity: false}

const htmlBoard = document.getElementById('game-board');

function main(currentTime){
    if (gameVars.gameOver){
        if( confirm('You Lost. Press OKAY to RESTART') ){
            window.location = '/';
        }
    }else{
        window.requestAnimationFrame(main);
        const secondsSinceLastRender = (currentTime - lastRenderTime)/1000;
        if (secondsSinceLastRender < 1 / BLOCK_SPD){ return; }
        lastRenderTime = currentTime;
        update();
        draw();
    }
}

function update(){
    gameVars = updateBoard();
    updateVirus();
    if (!gameVars.gravity){
        updatePill();
    }else{
        console.log("Falling");
    }

}

function draw(){
    htmlBoard.innerHTML = '';
    drawPill(htmlBoard);
    drawBoard(htmlBoard);
}

window.requestAnimationFrame(main);