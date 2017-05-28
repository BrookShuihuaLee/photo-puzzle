import { UPDATE_FOR_PUZZLE_STATE } from '../constants/actionTypes'
import { PUZZLE_STATES } from '../constants/states'

export default function (state = {
    state: PUZZLE_STATES.READY,
    imageW: null,
    imageH: null,
    blockLen: null,
    blocks: null,
    emptyBlock: null,
    isOver: null,
    
    //copy from imageGrid
    vn: null,
    hn: null,
    lineColor: null,

    //copy from puzzleImage
    blobUrl: null
}, action) {
    switch (action.type) {
        case UPDATE_FOR_PUZZLE_STATE:
            return {
                ...state,
                ...action.state
            }
        default:
            return state
    }
}