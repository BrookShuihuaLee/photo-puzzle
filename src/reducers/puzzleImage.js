import { UPDATE_IMAGE_STATE } from '../global/constants/actionTypes'
import { IMAGE_STATES } from '../global/constants/states'

const initialState = {
    state: IMAGE_STATES.NOT_EXIST,
    blob: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_IMAGE_STATE:
            return {
                ...state,
                state: action.type
            }
        default:
            return state
    }
}