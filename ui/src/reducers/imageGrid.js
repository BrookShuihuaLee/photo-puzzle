import { INIT_PARTS_NUM } from '../constants/puzzle'
import { UPDATE_IMAGE_GRID_STATE } from '../constants/actionTypes'

export default (state = {
    vn: INIT_PARTS_NUM,
    hn: INIT_PARTS_NUM,
    lineColor: null
}, action) => {
    switch (action.type) {
        case UPDATE_IMAGE_GRID_STATE:
            return {
                ...state,
                ...action.state
            }
        default:
            return state
    }
}