import { UPDATE_PUZZLE_IMAGE_STATE } from '../constants/actionTypes'
import { IMAGE_STATES } from '../constants/states'
import {
    downloadImageRandom as downloadImageRandomApi,
    downloadImage as downloadImageApi,
    uploadImage as uploadImageApi
} from '../apis'
import { updateGridLineColor } from './updateImageGridState'

export function uploadImage(blob) {
    return async (dispatch, getState) => {
        let { puzzleImage } = getState()
        if (puzzleImage.state !== IMAGE_STATES.NOT_EXIST && puzzleImage.state !== IMAGE_STATES.EXIST) return
        dispatch({
            type: UPDATE_PUZZLE_IMAGE_STATE,
            state: {
                state: IMAGE_STATES.UPLOADING
            }
        })
        let res = await uploadImageApi(blob)
        if (res) {
            await dispatch(updateGridLineColor(res.blob))
            dispatch({
                type: UPDATE_PUZZLE_IMAGE_STATE,
                state: {
                    ...res,
                    state: IMAGE_STATES.EXIST
                }
            })
        } else {
            dispatch({
                type: UPDATE_PUZZLE_IMAGE_STATE,
                state: {
                    state: IMAGE_STATES.NOT_EXIST
                }
            })
        }
    }
}

export function downloadImage(path) {
    return async (dispatch, getState) => {
        let { puzzleImage } = getState()
        if (puzzleImage.state !== IMAGE_STATES.NOT_EXIST && puzzleImage.state !== IMAGE_STATES.EXIST) return
        dispatch({
            type: UPDATE_PUZZLE_IMAGE_STATE,
            state: {
                state: IMAGE_STATES.DOWNLOADING
            }
        })
        let res = await downloadImageApi(path)
        if (res) {
            await dispatch(updateGridLineColor(res.blob))
            dispatch({
                type: UPDATE_PUZZLE_IMAGE_STATE,
                state: {
                    ...res,
                    state: IMAGE_STATES.EXIST
                }
            })
        } else {
            dispatch(updateGridLineColor(res.img))
            dispatch({
                type: UPDATE_PUZZLE_IMAGE_STATE,
                state: {
                    state: IMAGE_STATES.NOT_EXIST
                }
            })
        }
    }
}

export function downloadImageRandom() {
    return async (dispatch, getState) => {
        let { puzzleImage } = getState()
        if (puzzleImage.state !== IMAGE_STATES.NOT_EXIST && puzzleImage.state !== IMAGE_STATES.EXIST) return
        dispatch({
            type: UPDATE_PUZZLE_IMAGE_STATE,
            state: {
                state: IMAGE_STATES.DOWNLOADING
            }
        })
        let res = await downloadImageRandomApi(puzzleImage.path)
        if (res) {
            await dispatch(updateGridLineColor(res.blob))
            dispatch({
                type: UPDATE_PUZZLE_IMAGE_STATE,
                state: {
                    ...res,
                    state: IMAGE_STATES.EXIST
                }
            })
        } else {
            dispatch({
                type: UPDATE_PUZZLE_IMAGE_STATE,
                state: {
                    state: IMAGE_STATES.NOT_EXIST
                }
            })
        }
    }
}