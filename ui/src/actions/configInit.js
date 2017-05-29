import { updateVerticalNum, updateHorizontalNum, updateGridLineColor } from './updateImageGridState'
import { downloadImage } from './updatePuzzleImageState'
import { startPuzzle } from './updateForPuzzleState'
import { setLanguageToEn } from './updateLanguages'
import { LANG_CODE_EN } from '../constants/languages'

export function initializeConfig({ vn, hn, path, lang }) {
    return async (dispatch, getState) => {
        if (lang === LANG_CODE_EN) {
            dispatch(setLanguageToEn())
        }
        if (vn && hn && path) {
            dispatch(updateVerticalNum(vn))
            dispatch(updateHorizontalNum(hn))
            await dispatch(downloadImage(path))
            await dispatch(startPuzzle(true))
        }
    }
}