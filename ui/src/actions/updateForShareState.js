import { UPDATE_FOR_SHARE_STATE } from '../constants/actionTypes'

export function triggerAdvanced() {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_FOR_SHARE_STATE,
            state: {
                showAdvanced: !getState().forShare.showAdvanced
            }
        })
    }
}

export function updatePaperHeight(paperHeight) {
    return {
        type: UPDATE_FOR_SHARE_STATE,
        state: {
            paperHeight
        }
    }
}

export function updateImagePosition(imageX, imageY) {
    return {
        type: UPDATE_FOR_SHARE_STATE,
        state: {
            imageX,
            imageY
        }
    }
}