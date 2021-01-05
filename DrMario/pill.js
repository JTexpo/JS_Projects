import { getMove, resetMove } from './input.js';
import { legalMove, addPill } from './board.js'


class P{
    constructor(x,y,colour,gtype,id){
        this.x = x;
        this.y = y;
        this.colour = colour;
        this.position = 0;
        this.gtype = gtype;
        this.virus = false;
        this.id = id;
    }

    turnClockwise(){
        switch(this.position){
            case 0:
                this.x -= 1;
                this.y += 1;
                this.position += 1;
                break;
            case 1:
                this.x -= 1;
                this.y -= 1;
                this.position += 1;
                break;
            case 2:
                this.x += 1;
                this.y -= 1;
                this.position += 1;
                break;
            case 3:
                this.x += 1;
                this.y += 1;
                this.position = 0;
                break;
        }
    }
    turnCounterClockwise(){
        switch(this.position){
            case 0:
                this.x -= 1;
                this.y -= 1;
                this.position = 3;
                break;
            case 1:
                this.x += 1;
                this.y -= 1;
                this.position -= 1;
                break;
            case 2:
                this.x += 1;
                this.y += 1;
                this.position -= 1;
                break;
            case 3:
                this.x -= 1;
                this.y += 1;
                this.position -= 1;
                break;
        }
    }

    fall(){
        this.y += 1;
    }
    rise(){
        this.y -= 1;
    }

    shiftLeft(){
        this.x -= 1;
    }
    shiftRight(){
        this.x += 1;
    }
}

class Pill{
    constructor(mP,sP){
        this.mainPill = mP;
        this.subPill = sP;
    }

    shiftRight(){
        this.mainPill.shiftRight();
        this.subPill.shiftRight();
    }
    shiftLeft(){
        this.mainPill.shiftLeft();
        this.subPill.shiftLeft();
    }

    fall(){
        this.mainPill.fall();
        this.subPill.fall();
    }
    rise(){
        this.mainPill.rise();
        this.subPill.rise();
    }

    turnClockwise(){
        this.subPill.turnClockwise();
    }
    turnCounterClockwise(){
        this.subPill.turnCounterClockwise();
    }

    getPill(){
        return [this.mainPill, this.subPill];
    }
}

let pill = new Pill(
    new P(4,1,'blue','blue',0),
    new P(5,1,'red','red',0)
);
let globalID = 1;
const COLOURS = ['red','blue','orange'];

export function draw(htmlBoard){
    let drawPill = pill.getPill();
    drawPill.forEach(p=>{
        const pillElm = document.createElement('div')
        pillElm.style.gridRowStart = p.y;
        pillElm.style.gridColumnStart = p.x;
        pillElm.classList = p.colour;
        htmlBoard.appendChild(pillElm);
    });
}

export function update(){
    switch (getMove()){
        case 'left':
            pill.shiftLeft();
            if (legalMove(pill)){ pill.shiftRight(); }
            break;
        case 'right':
            pill.shiftRight();
            if (legalMove(pill)){ pill.shiftLeft(); }
            break;
        case 'flip':
            pill.turnClockwise();
            if (legalMove(pill)){ pill.turnCounterClockwise(); }
            break;
        case 'cflip':
            pill.turnCounterClockwise();
            if (legalMove(pill)){ pill.turnClockwise(); }
            break;
    }resetMove();

    pill.fall();
    if(legalMove(pill)){
        pill.rise();
        addPill(pill);
        newPill();
    }
}

function newPill(){
    const c1 = Math.floor(Math.random()*3);
    const c2 = Math.floor(Math.random()*3);
    if (c1 === 3){ c1 = 2; }
    if (c2 === 3){ c2 = 2; }
    pill = new Pill(
        new P(4,1,COLOURS[c1],COLOURS[c1],globalID),
        new P(5,1,COLOURS[c2],COLOURS[c2],globalID)
    );
    globalID += 1;
}