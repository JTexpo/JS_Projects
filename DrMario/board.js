
class Board{
    constructor(){
        this.contents = [];
    }

    addContent(cnt){
        this.contents.push(cnt);
    }

    getContents(){
        return this.contents;
    }

    getRowElms(rowID){
        const row = [];
        this.contents.forEach((cnt,index)=>{
            if (cnt.y === rowID){ 
                row.push({
                    cnt: cnt,
                    mainID: index
                });
            }
        });
        return row;
    }
    getColElms(colID){
        const col = [];
        this.contents.forEach((cnt,index)=>{
            if (cnt.x === colID){ 
                col.push({
                    cnt: {...cnt},
                    mainID: index
                });
            }
        });
        return col;
    }

    getNonVirus(){
        this.sortVirusToBack();
        const arr = [];
        this.contents.forEach((cnt,index)=>{
            if (!cnt.virus){ 
                arr.push({
                    cnt: {...cnt},
                    mainID: index
                });
            }
        });
        return arr;
    }

    removeElms(arr){
        arr.forEach(id=>{
            if (id == this.contents.length){
                this.contents.pop()
            }else{
                this.contents.splice(id,1);
            }
        })
    }

    sortVirusToBack(){
        this.contents.sort((c1,c2)=>{ return (c1.virus === c2.virus)? 0 : c1.virus? 1 : -1;});
    }
}

const GAME_HEIGHT = 17;
const GAME_WIDTH = 8;
const gameBoard = new Board();

export function addPill(pill){
    gameBoard.addContent(pill.mainPill);
    gameBoard.addContent(pill.subPill);
}

export function addVirus(virus){
    if (gameBoard.getContents().length === 0){
        virus.forEach(virus=>{
            gameBoard.addContent(virus);
        });
    }
}


export function draw(htmlBoard){
    const cnts = gameBoard.getContents();
    cnts.forEach(cnt=>{
        const cntElm = document.createElement('div')
        cntElm.style.gridRowStart = cnt.y;
        cntElm.style.gridColumnStart = cnt.x;
        cntElm.classList = cnt.colour;
        htmlBoard.appendChild(cntElm);
    });
}

export function update(){
    checkFourInRow();
    checkFourInCol();
    const gameVars = {
        gravity: checkApplyGravity(),
        gameOver: checkGameOver()
    }
    return gameVars
}

function checkFourInRow(){
    let allIDs = []
    for (let i = 1; i <= GAME_HEIGHT; i++){
        const row = gameBoard.getRowElms(i);
        row.sort((elm1,elm2)=>{return elm1.cnt.x - elm2.cnt.x})
        if (row.length >= 4){ 
            let count = 0;
            let previous = {x: -1, gtype: ''};
            let IDarr = [];
            row.forEach(elm=>{
                if ((elm.cnt.x - previous.x > 1) || elm.cnt.gtype !== previous.gtype){
                    if(count >= 4){ 
                        IDarr.forEach(id=>{ allIDs.push(id); });
                    }
                    count = 1; 
                    IDarr = [elm.mainID];    
                }else{
                    count += 1;
                    IDarr.push(elm.mainID);
                }
                previous = {x: elm.cnt.x, gtype: elm.cnt.gtype};
            });
            if(count >= 4){ 
                IDarr.forEach(id=>{ allIDs.push(id); });
            }
        }
    }
    if(allIDs.length > 0){ 
        allIDs.sort((ida,idb)=> {return idb - ida });
        gameBoard.removeElms(allIDs);
    }
}
function checkFourInCol(){
    let allIDs = []
    for (let i = 1; i <= GAME_HEIGHT; i++){
        const row = gameBoard.getColElms(i);
        row.sort((elm1,elm2)=>{return elm1.cnt.y - elm2.cnt.y})
        if (row.length >= 4){ 
            let count = 0;
            let previous = {y: -1, gtype: ''};
            let IDarr = [];
            row.forEach(elm=>{
                if ((elm.cnt.y - previous.y > 1) || elm.cnt.gtype !== previous.gtype){
                    if(count >= 4){ 
                        IDarr.forEach(id=>{ allIDs.push(id); });
                    }
                    count = 1; 
                    IDarr = [elm.mainID];    
                }else{
                    count += 1;
                    IDarr.push(elm.mainID);
                }
                previous = {y: elm.cnt.y, gtype: elm.cnt.gtype};
            });
            if(count >= 4){ 
                IDarr.forEach(id=>{ allIDs.push(id); });
            }
        }
    }
    if(allIDs.length > 0){ 
        allIDs.sort((ida,idb)=> {return idb - ida });
        gameBoard.removeElms(allIDs);
    }
}
function checkApplyGravity(){
    const cnts = gameBoard.getNonVirus();
    let gravity = false;
    let stillWhole = [];
    cnts.forEach((cnt,indexA)=>{
        cnts.forEach((c,indexB)=>{
            if (c.cnt.id === cnt.cnt.id && !stillWhole.includes(cnt.cnt.id) &&
                !(c.cnt.x === cnt.cnt.x && c.cnt.y === cnt.cnt.y)){
                stillWhole.push(c.cnt.id);
                const dupPill1 = {...cnt.cnt};
                const dupPill2 = {...c.cnt};
                dupPill1.y += 1;
                dupPill2.y += 1;
                if (!(singleGC(dupPill1)||singleCC(dupPill1))&&
                    !(singleGC(dupPill2)||singleCC(dupPill2))){
                        gravity = true;
                    gameBoard.contents[indexA].y+=1;
                    gameBoard.contents[indexB].y+=1;
                }
            }
        });
    });
    cnts.forEach((cnt,index)=>{
        if(!stillWhole.includes(cnt.cnt.id)){
            const dupPill = {...cnt.cnt};
            dupPill.y += 1;
            if (!(singleGC(dupPill)||singleCC(dupPill))){
                gravity = true;
                gameBoard.contents[index].y+=1;
            }
        }
    });
    return gravity;
}

function checkGameOver(){
    const cnts = gameBoard.getContents();
    let go = false;
    cnts.forEach(cnt=>{
        if (cnt.y <= 1){ go = true; }
    });
    return go;
}

export function legalMove(pill){
    return ( gravityCheck(pill) || boxCheck(pill) || contentCheck(pill) );
}

function gravityCheck(pill){
    return (singleGC(pill.subPill)|| singleGC(pill.mainPill));
}function singleGC(pill){ return pill.y > GAME_HEIGHT }

function boxCheck(pill){
    return ( singleBC(pill.subPill)|| singleBC(pill.mainPill));
}function singleBC(pill){ return (pill.x < 1 || pill.x > GAME_WIDTH) }

function contentCheck(pill){
    const pills = pill.getPill();
    let illegal = false;
    pills.forEach(pill=>{
        if(singleCC(pill)){ illegal = true; }
    });
    return illegal;
}function singleCC(p){
    const cnts = gameBoard.getContents();
    let illegal = false;
    cnts.forEach(cnt=>{
        if (p.x == cnt.x && p.y == cnt.y){ illegal = true; }
    });
    return illegal
}