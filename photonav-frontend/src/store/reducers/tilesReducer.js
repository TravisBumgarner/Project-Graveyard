export default function tileReducer(state=[], action){
    switch(action.type){
        case 'MOVE_TILE_TO_CENTER':
            console.log("action.centerTile ", action.centerTile);
            return Object.assign({}, state, {
                centerTile: action.centerTile
            })
        default:
            return state;
    }
}