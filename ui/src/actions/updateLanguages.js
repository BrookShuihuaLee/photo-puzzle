import { SET_LANGUAGE_TO_EN, SET_LANGUAGE_TO_ZH, SWITCH_LANGUAGE } from '../constants/actionTypes'

export function setLanguageToEn() {
    return {
        type: SET_LANGUAGE_TO_EN
    }
}

export function setLanguageToZh() {
    return {
        type: SET_LANGUAGE_TO_ZH
    }
}

export function switchLanguage() {
    return {
        type: SWITCH_LANGUAGE
    }
}