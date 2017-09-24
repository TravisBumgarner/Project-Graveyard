const MOVE_TILE_TO_CENTER = 'MOVE_TILE_TO_CENTER';

export function moveTileToCenter(centerTile){
    console.log("tileactions ", centerTile);
    return {
        type: MOVE_TILE_TO_CENTER,
        centerTile
    }
}