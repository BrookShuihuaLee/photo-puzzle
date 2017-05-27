import { UPDATE_FOR_PUZZLE_STATE } from '../constants/actionTypes'
import { PUZZLE_STATES } from '../constants/states'
import { PUZZLE_MARGIN } from '../constants/puzzle'
import {
    splitImage,
    clickBlock as clickBlockApi,
    gameIsOver
} from '../apis/'

export function startPuzzle(bodyWidth) {
    return async (dispatch, getState) => {
        let { puzzleImage, imageGrid } = getState()
        let width = document.body.offsetWidth - PUZZLE_MARGIN * 2

        dispatch({
            type: UPDATE_FOR_PUZZLE_STATE,
            state: {
                state: PUZZLE_STATES.PLAYING,
                ...await splitImage(puzzleImage.blob, imageGrid.vn, imageGrid.hn, width),
                isOver: false,

                ...imageGrid
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

export function clickBlock(index) {
    return (dispatch, getState) => {
        let {
            blocks,
            emptyBlock
        } = getState().forPuzzle
        let block = blocks[index]
        if (clickBlockApi(block, emptyBlock)) {
            dispatch({
                type: UPDATE_FOR_PUZZLE_STATE,
                state: {
                    blocks: [...blocks],
                    emptyBlock: { ...emptyBlock }
                }
            })
        }
    }
}

export function checkGameOver() {
    return (dispatch, getState) => {
        let {
            blocks,
            emptyBlock,

            vn,
            hn
        } = getState().forPuzzle
        if (gameIsOver(blocks, emptyBlock, vn, hn)) {
            dispatch({
                type: UPDATE_FOR_PUZZLE_STATE,
                state: {
                    isOver: true
                }
            })
        }
    }
}