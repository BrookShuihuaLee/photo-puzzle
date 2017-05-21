import { UPDATE_IMAGE_GRID_STATE } from '../constants/actionTypes'

export function updateVerticalNum(vn) {
    return {
        type: UPDATE_IMAGE_GRID_STATE,
        state: {
            vn
        }
    }
}

export function updateHorizontalNum(hn) {
    return {
        type: UPDATE_IMAGE_GRID_STATE,
        state: {
            hn
        }
    }
}