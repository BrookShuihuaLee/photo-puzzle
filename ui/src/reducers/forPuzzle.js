import { UPDATE_FOR_PUZZLE_STATE } from '../constants/actionTypes'
import { PUZZLE_STATES } from '../constants/states'

export default function (state = {
    state: PUZZLE_STATES.READY,
    imageW: null,
    imageH: null
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