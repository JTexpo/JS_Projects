import { addVirus } from './board.js'

class Virus {
    constructor(x,y,colour, gtype){
        this.x = x;
        this.y = y;
        this.colour = colour;
        this.gtype = gtype;
        this.virus = true
    }
}

const DIFFICULTY = 10;
const COLOURS = ['red','blue','orange'];

export function update(){
    addVirus(virusInit());
}

export function virusInit(){
    let takenXY = []
    let newXY = getRandomXY();
    let c = 0;
    let virus = []
    for(let i = 0; i < DIFFICULTY; i++){
        while (takenXY.includes(newXY)){
            newXY = getRandomXY();
        }
        takenXY.push(newXY);
        c = Math.floor(Math.random()*3);
        if (c === 3){ c = 2; }
        let v = new Virus(
                newXY.x,
                newXY.y,
                COLOURS[c],
                COLOURS[c]
            );
        virus.push(v);
    }
    return virus;
}

function getRandomXY(){
    return { x: Math.floor(Math.random()*7)+1, y: Math.floor(Math.random()*5)+12}
}