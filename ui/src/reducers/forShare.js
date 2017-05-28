import { UPDATE_FOR_SHARE_STATE } from '../constants/actionTypes'

export default function (state = {
    paperHeight: 0,
    showAdvanced: false,
    imageX: null,
    imageY: null,
    imageW: null,
    imageH: null,
    isSharing: false
}, action) {
    switch (action.type) {
        case UPDATE_FOR_SHARE_STATE:
            return {
                ...state,
                ...action.state
            }
        default:
            return state
    }
}