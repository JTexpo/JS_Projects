import {iblock} from './blocks/iblock.js';
import {jblock} from './blocks/jblock.js';
import {tblock} from './blocks/tblock.js';
import {oblock} from './blocks/oblock.js';
import {sblock} from './blocks/sblock.js';
import {zblock} from './blocks/zblock.js';
import {lblock} from './blocks/lblock.js';

import {GBOARD} from './board.js';

import {resetInput, getInputDirection} from './input.js';

const MAP_HEIGHT = 18;
const MAP_WIDTH = 10;

let block = new zblock();
let new_block = false;

let grace = 0;

export function update(){
    move();
    if (grace === 10){
        fall();
        if (new_block){
            newBlock();
        }
        grace = 0;
    }else{
        grace += 1;
    }
    
    
}
export function draw(gameBoard){
    const pos = block.get_pos();
    pos.forEach(segment=>{
        const blockElement = document.createElement('div');
            blockElement.style.gridRowStart = segment.y;
            blockElement.style.gridColumnStart = segment.x;
            blockElement.classList.add(block.get_type());
            gameBoard.appendChild(blockElement);
    });
}

function fall(){
    const pos = block.get_pos();
    if (checkFloor(pos) && checkBlocks(pos)){
        block.drop();
    }else{
        pos.forEach(segment=>{
            GBOARD.addTiles(segment,block.get_type());
        })
        new_block = true;
    }
}

function checkFloor(pos){
    let floor = true
    pos.forEach(tile =>{
        if ((tile.y + 1) > MAP_HEIGHT){floor = false;}
    });
    return floor;
}

function checkBlocks(pos){
    let contact = true;
    const tiles = GBOARD.getTiles();
    pos.forEach(tile=>{
        tiles.forEach((t)=>{
            if ((tile.y + 1 === t.y)&&(tile.x === t.x)){ contact = false; }
        });
    });
    return contact;
}

function newBlock(){
    new_block = false;
    switch(Math.floor(Math.random()*7)){
        case 0:
            block = new iblock();
            break;
        case 1:
            block=new jblock();
            break;
        case 2:
            block=new tblock();
            break;
        case 3:
            block=new oblock();
            break;
        case 4:
            block=new sblock();
            break;
        case 5:
            block=new zblock();
            break;
        case 6:
            block=new lblock();
            break;
        case 7:
            newBlock();
            break;
    }
    
}

function move(){
    switch(getInputDirection().move){
        case 'left':
            if (!legalMove(block.shiftLeft())){ 
                block.shiftRight(); 
            }
            break;
        case 'right':
            if (!legalMove(block.shiftRight())){
                block.shiftLeft();
            }
            break;
        case 'flip':
            if (!legalMove(block.flip())){
                block.flipback();
            }
            break;
        default:
            break;
    }
    resetInput();
}

function legalMove(){
    const pos = block.get_pos();
    let legal = true;
    pos.forEach(p=>{
        if (p.x <= 0 || p.x > MAP_WIDTH){
            legal = false;
        }
    });
    if (legal){
        legal = checkBlocks(pos);
    }
    return legal;
}