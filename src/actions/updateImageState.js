import { UPDATE_IMAGE_STATE } from '../global/constants/actionTypes'
import { IMAGE_STATES } from '../global/constants/states'

export function uploadImage(url) {
    return {
        type: UPDATE_IMAGE_STATE,
        state: IMAGE_STATES.UPLOADING
    }
}

export function downloadImage(url) {
    return {
        type: UPDATE_IMAGE_STATE,
        state: IMAGE_STATES.DOWNLOADING
    }
}