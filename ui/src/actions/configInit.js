import { updateVerticalNum, updateHorizontalNum, updateGridLineColor } from './updateImageGridState'
import { downloadImage } from './updatePuzzleImageState'
import { startPuzzle } from './updateForPuzzleState'

export function initializeConfig({ vn, hn, path }) {
    return async (dispatch, getState) => {
        dispatch(updateVerticalNum(vn))
        dispatch(updateHorizontalNum(hn))
        await dispatch(downloadImage(path))
        await dispatch(startPuzzle(true))
    }
}