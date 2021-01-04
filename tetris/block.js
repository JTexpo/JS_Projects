export class Tile{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

export class BLOCK {
    
    constructor(){
        this.main_tile = new Tile(0,1);
        this.sub1_tile = new Tile(0,1);
        this.sub2_tile = new Tile(0,1);
        this.sub3_tile = new Tile(0,1);
        this.type = '';
        this.sflip = 0;
    }

    get_type(){
        return this.type;
    }

    drop(){
        this.main_tile.y += 1;
        this.sub1_tile.y += 1;
        this.sub2_tile.y += 1;
        this.sub3_tile.y += 1;
    }

    shiftLeft(){
        this.main_tile.x -= 1;
        this.sub1_tile.x -= 1;
        this.sub2_tile.x -= 1;
        this.sub3_tile.x -= 1;
    }
    shiftRight(){
        this.main_tile.x += 1;
        this.sub1_tile.x += 1;
        this.sub2_tile.x += 1;
        this.sub3_tile.x += 1;
    }

    get_pos(){
        return [this.main_tile,this.sub1_tile,
                this.sub2_tile, this.sub3_tile]
    }

}