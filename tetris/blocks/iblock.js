import { BLOCK, Tile } from '../block.js'

export class iblock extends BLOCK{
    constructor(){
        super();
        this.main_tile = new Tile(3,1);
        this.sub1_tile = new Tile(2,1);
        this.sub2_tile = new Tile(4,1);
        this.sub3_tile = new Tile(5,1);
        this.type = 'i-block';
        this.sflip = 0;
    }

    flip(){
        switch(this.sflip){
            case 0:
                this.vert_flip();
                this.sflip = 1;
                break;
            case 1: 
                this.horz_flip();
                this.sflip = 0;
                break;
        }
    }

    flipback(){
        switch(this.sflip){
            case 0:
                this.vert_flip();
                this.sflip = 1;
                break;
            case 1: 
                this.horz_flip();
                this.sflip = 0;
                break;
        }
    }
    
    vert_flip(){
        this.sub1_tile.x = this.main_tile.x;
        this.sub2_tile.x = this.main_tile.x;
        this.sub3_tile.x = this.main_tile.x;
        
        this.sub1_tile.y = this.main_tile.y + 1;
        this.sub2_tile.y = this.main_tile.y - 1;
        this.sub3_tile.y = this.main_tile.y - 2;
    }

    horz_flip(){
        this.sub1_tile.y = this.main_tile.y;
        this.sub2_tile.y = this.main_tile.y;
        this.sub3_tile.y = this.main_tile.y;
        
        this.sub1_tile.x = this.main_tile.x - 1;
        this.sub2_tile.x = this.main_tile.x + 1;
        this.sub3_tile.x = this.main_tile.x + 2;
    }
}