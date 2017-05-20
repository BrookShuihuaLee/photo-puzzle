import { UPDATE_IMAGE_STATE } from '../constants/actionTypes'
import { IMAGE_STATES } from '../constants/states'
import { downloadImageRandom } from '../apis'

export function uploadImage(url) {
    return {
        type: UPDATE_IMAGE_STATE,
        state: {
            state: IMAGE_STATES.UPLOADING
        }
    }
}

export function downloadImage(url) {
    return {
        type: UPDATE_IMAGE_STATE,
        state: {
            state: IMAGE_STATES.DOWNLOADING
        }
    }
}

export function randomImage() {
    return async function (dispatch) {
        dispatch({
            type: UPDATE_IMAGE_STATE,
            state: {
                state: IMAGE_STATES.DOWNLOADING
            }
        })
        dispatch({
            type: UPDATE_IMAGE_STATE,
            state: {
                ...await downloadImageRandom(),
                state: IMAGE_STATES.EXIST
            }
        })
    }
}