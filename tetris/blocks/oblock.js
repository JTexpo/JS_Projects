import { BLOCK, Tile } from '../block.js'

export class oblock extends BLOCK{
    constructor(){
        super();
        this.main_tile = new Tile(5,1);
        this.sub1_tile = new Tile(4,1);
        this.sub2_tile = new Tile(4,2);
        this.sub3_tile = new Tile(5,2);
        this.type = 'o-block';
        this.sflip = 0;
    }

    flip(){}
}