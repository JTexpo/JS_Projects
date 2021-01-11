const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight;
canvas.height = canvas.width;

class Grass{
    constructor(){
        this.colour = 'green';
    }
    draw(){
        ctx.beginPath();
        ctx.rect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = this.colour;
        ctx.fill();
    }
}

class Lake {
    constructor(){
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        this.radius = canvas.height/3;
        this.colour = 'navy';
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2,false);
        ctx.fillStyle = this.colour;
        ctx.fill();
    }
}

class Goblin{
    constructor(){
        this.x = canvas.width/2 + canvas.height/3;
        this.y = canvas.height/2;
        this.radius = canvas.height/100;
        this.colour = 'red';
        this.slope = 0;
        this.speed = canvas.height/12500;
    }

    reset(){
        this.x = canvas.width/2 + canvas.height/3;
        this.y = canvas.height/2;
        this.slope = 0;
    }
    
    getPos(){ return {x:this.x, y:this.y }; }

    move(player){
        const P_THETA = Math.atan2(player.y - canvas.height/2, player.x - canvas.width/2);

        this.slope = Math.atan2(this.y - canvas.height/2, this.x - canvas.width/2);
        
        let DELTA = P_THETA - this.slope;
        if (Math.abs(DELTA) < this.speed){ return; }
        
        if (Math.abs(DELTA) > Math.PI){
            this.slope += DELTA > 0 ? -1 * this.speed : this.speed;
        }else{ this.slope += DELTA > 0 ? this.speed : -1 * this.speed; }


        this.x = canvas.width/3 * Math.cos(this.slope) + canvas.width/2;
        this.y = canvas.height/3 * Math.sin(this.slope) + canvas.height/2;
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2,false);
        ctx.fillStyle = this.colour;
        ctx.fill();
    }
}

class Player{
    constructor(){
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        this.radius = canvas.height/100;
        this.colour = 'navajowhite';
        this.speed = canvas.width/200;
    }

    reset(){
        this.x = canvas.width/2;
        this.y = canvas.height/2;
    }

    move(motion){
        if (Math.hypot(motion.y - this.y,motion.x - this.x) < this.speed){ return; }

        const SLOPE = Math.atan2(motion.y - this.y, motion.x - this.x);
        this.x += this.speed * Math.cos(SLOPE);
        this.y += this.speed * Math.sin(SLOPE);
    }

    getPos(){ return {x:this.x, y:this.y }; }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2,false);
        ctx.fillStyle = this.colour;
        ctx.fill();
    }
}

const LAKE = new Lake();
const GOBLIN = new Goblin();
const PLAYER = new Player();
const GRASS = new Grass();
let motion = {x:canvas.width/2,y:canvas.height/2};
let animationID = 0;


function animate(){
    animationID = window.requestAnimationFrame(animate);
    GRASS.draw();
    LAKE.draw();
    GOBLIN.draw();
    PLAYER.draw();
    PLAYER.move(motion);
    GOBLIN.move(PLAYER.getPos());
    const PLAYER_POS = PLAYER.getPos();
    const GOBLIN_POS = GOBLIN.getPos();
    const DIST = Math.hypot(
        PLAYER_POS.x - GOBLIN_POS.x,
        PLAYER_POS.y - GOBLIN_POS.y
    );
    if (DIST <   canvas.height/50){
        PLAYER.reset();
        GOBLIN.reset();
    }
}

window.addEventListener("mousemove",(event)=>{
    motion = {x: event.clientX, y: event.clientY};
});


window.requestAnimationFrame(animate);