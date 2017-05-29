import { SET_LANGUAGE_TO_EN, SET_LANGUAGE_TO_ZH, SWITCH_LANGUAGE } from '../constants/actionTypes'
import { ZH, EN } from '../constants/languages'
import { changeTitle } from '../global/tools'

export default (state = ZH, action) => {
    switch (action.type) {
        case SET_LANGUAGE_TO_EN:
            changeTitle(EN.TITLE)
            return EN
        case SET_LANGUAGE_TO_ZH:
            changeTitle(ZH.TITLE)
            return ZH
        case SWITCH_LANGUAGE:
            let nextLang = state === ZH ? EN : ZH
            changeTitle(nextLang.TITLE)
            return nextLang
        default:
            return state
    }
}