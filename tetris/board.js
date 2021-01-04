class BOARD{
    constructor(){
        this.tiles = [];
    }

    addTiles(tile,color){
        tile['color'] = color;
        this.tiles.push(tile);
    }

    getTiles(){
        return this.tiles;
    }

    deleteRow(row){
        this.tiles.sort((a,b)=>{return a.y-b.y});
        console.log(this.tiles);
        this.tiles.forEach((tile,index)=>{
            if (tile.y === row){
                this.tiles.splice(index,MAP_WIDTH);
                return;
            }
        });
    }

    dropRow(row){
        this.tiles.forEach(tile=>{
            if (tile.y <= row){
                tile.y += 1;
            }
        });
    }
}

export const GBOARD = new BOARD();

let counter = [];
let deletedRows = [];

const MAP_HEIGHT = 18;
const MAP_WIDTH = 10;



export function draw(gameBoard){
    const tiles = GBOARD.getTiles();
    tiles.forEach(segment=>{
        const blockElement = document.createElement('div');
        blockElement.style.gridRowStart = segment.y;
        blockElement.style.gridColumnStart = segment.x;
        blockElement.classList.add(segment.color);
        gameBoard.appendChild(blockElement);
    });
}

export function update(){
    reset();
    setCounter();
    removeRows();
    dropRows();
}

export function go(){
    let go = false;
    const tiles = GBOARD.getTiles();
    tiles.forEach(tile=>{
        if (tile.y === 1){ go = true;}
    })
    return go;
}

function reset(){
    for (let index = 0; index <= MAP_HEIGHT; index++){
        counter[index] = 0;
    }
    deletedRows = [];
}

function setCounter(){
    const tiles = GBOARD.getTiles();
    tiles.forEach(tile=>{
        counter[tile.y]+=1;
    });
}

function removeRows(){
    for(let index = 0; index <= MAP_HEIGHT; index++) {
        if (counter[index] >= MAP_WIDTH){
            console.log("ROW DELET", index);
            GBOARD.deleteRow(index);
            deletedRows.push(index);
        }
    }
}

function dropRows(){
    if (deletedRows.length === 0){ return; }
    if (deletedRows.length > 1){
        deletedRows.sort((a, b) => {return a - b});
    }
    deletedRows.forEach(rowID=>{
        GBOARD.dropRow(rowID);
    });
}