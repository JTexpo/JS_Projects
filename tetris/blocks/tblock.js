import { BLOCK, Tile } from '../block.js';

export class tblock extends BLOCK{
    constructor(){
        super();
        this.main_tile = new Tile(4,2);
        this.sub1_tile = new Tile(3,2);
        this.sub2_tile = new Tile(5,2);
        this.sub3_tile = new Tile(4,1);
        this.type = 't-block';
        this.sflip = 0;
    }

    flip(){
        switch(this.sflip){
            case 0:
                this.sflip += 1;
                this.flip_0();
                break;
            case 1:
                this.sflip += 1;
                this.flip_1();
                break;
            case 2:
                this.sflip += 1;
                this.flip_2();
                break;
            case 3:
                this.sflip = 0;
                this.flip_3();
                break;
        }
    }
    flipback(){
        switch(this.sflip){
            case 0:
                this.sflip = 3;
                this.flip_2();
                break;
            case 1:
                this.sflip -= 1;
                this.flip_3();
                break;
            case 2:
                this.sflip -= 1;
                this.flip_0();
                break;
            case 3:
                this.sflip -= 1;
                this.flip_1();
                break;
        }
    }
    
    flip_0(){
        this.sub1_tile.x = this.main_tile.x;
        this.sub2_tile.x = this.main_tile.x;
        this.sub3_tile.x = this.main_tile.x+1;
        
        this.sub1_tile.y = this.main_tile.y + 1;
        this.sub2_tile.y = this.main_tile.y - 1;
        this.sub3_tile.y = this.main_tile.y;
    }

    flip_1(){
        this.sub1_tile.x = this.main_tile.x + 1;
        this.sub2_tile.x = this.main_tile.x - 1;
        this.sub3_tile.x = this.main_tile.x;
        
        this.sub1_tile.y = this.main_tile.y;
        this.sub2_tile.y = this.main_tile.y;
        this.sub3_tile.y = this.main_tile.y + 1;
    }

    flip_2(){
        this.sub1_tile.x = this.main_tile.x;
        this.sub2_tile.x = this.main_tile.x;
        this.sub3_tile.x = this.main_tile.x-1;
        
        this.sub1_tile.y = this.main_tile.y -1;
        this.sub2_tile.y = this.main_tile.y + 1;
        this.sub3_tile.y = this.main_tile.y;
    }

    flip_3(){
        this.sub1_tile.x = this.main_tile.x - 1;
        this.sub2_tile.x = this.main_tile.x + 1;
        this.sub3_tile.x = this.main_tile.x;
        
        this.sub1_tile.y = this.main_tile.y;
        this.sub2_tile.y = this.main_tile.y;
        this.sub3_tile.y = this.main_tile.y - 1;
    }
}