import { UPDATE_FOR_PUZZLE_STATE } from '../constants/actionTypes'
import { PUZZLE_STATES } from '../constants/states'
import { PUZZLE_MARGIN } from '../constants/puzzle'
import { splitImage } from '../apis/'

export function startPuzzle(bodyWidth) {
    return async (dispatch, getState) => {
        let { puzzleImage, imageGrid } = getState()
        let width = document.body.offsetWidth - PUZZLE_MARGIN * 2

        dispatch({
            type: UPDATE_FOR_PUZZLE_STATE,
            state: {
                state: PUZZLE_STATES.PLAYING,
                ...await splitImage(puzzleImage.blob, imageGrid.vn, imageGrid.hn, width)
            }
        })
    }
}

export function preparePuzzle() {
    return {
        type: UPDATE_FOR_PUZZLE_STATE,
        state: {
            state: PUZZLE_STATES.READY
        }
    }
}