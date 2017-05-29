import { UPDATE_PUZZLE_IMAGE_STATE } from '../constants/actionTypes'
import { IMAGE_STATES } from '../constants/states'

export default (state = {
    state: IMAGE_STATES.NOT_EXIST,
    path: null,
    blob: null,
    blobUrl: null,
    width: null,
    height: null
}, action) => {
    switch (action.type) {
        case UPDATE_PUZZLE_IMAGE_STATE:
            return {
                ...state,
                ...action.state
            }
        default:
            return state
    }
}