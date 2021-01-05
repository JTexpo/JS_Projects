let move = '';

window.addEventListener('keydown',(event)=>{
    switch(event.key){
        case 'ArrowLeft':
            move = 'left';
            break;
        case 'ArrowRight':
            move = 'right';
            break;
        case 'ArrowUp':
            move = 'flip';
            break;
        case 'ArrowDown':
            move = 'cflip';
            break;
    }
});

export function resetMove(){
    move = '';
}
export function getMove(){
    return move;
};