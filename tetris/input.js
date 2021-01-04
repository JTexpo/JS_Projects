let inputDirection = {move:''};

window.addEventListener('keydown',(e)=>{
    switch (e.key){
        case 'ArrowLeft':
            inputDirection = {move:'left'};
            break;
        case 'ArrowRight':
            inputDirection = {move:'right'};
            break;
        case 'ArrowUp':
            inputDirection = {move:'flip'};
            break;
    }
})

export function resetInput(){
    inputDirection = {move:''};
}
export function getInputDirection(){
    return inputDirection;
}