import _ from 'lodash'

export const LANG_CODE_ZH = 'ZH'
export const LANG_CODE_EN = 'EN'

const strings = {
    lang: {
        ZH: LANG_CODE_ZH,
        EN: LANG_CODE_EN
    },
    TITLE: {
        ZH: '拼出我的照片',
        EN: 'PHOTO PUZZLE'
    },
    SWICH_LANGUAGE: {
        ZH: 'ENGLISH',
        EN: '中文'
    },
    PUZZLE: {
        ZH: '拼图',
        EN: 'PUZZLE'
    },
    SHARE: {
        ZH: '分享',
        EN: 'SHARE'
    },
    ABOUT: {
        ZH: '关于',
        EN: 'ABOUT'
    },
    PLAY_AGAIN: {
        ZH: '再来一次',
        EN: 'PLAY AGAIN'
    },
    SHARE_PUZZLE: {
        ZH: '分享拼图',
        EN: 'SHARE PUZZLE'
    },
    CHANGE_A_PHOTO: {
        ZH: '换张拼图',
        EN: 'CHANGE PHOTO'
    },
    SIMPLE: {
        ZH: '简洁',
        EN: 'SIMPLE'
    },
    ADVANCED: {
        ZH: '高级',
        EN: 'ADVANCED'
    },
    PLAY: {
        ZH: '开始游戏',
        EN: 'PLAY'
    },
    RANDOM_PHOTO: {
        ZH: '随便来一张',
        EN: 'RANDOM'
    },
    UPLOAD_PHOTO: {
        ZH: '上传照片',
        EN: 'UPLOAD'
    },
    ALT_PHOTO: {
        ZH: '照 片',
        EN: 'PHOTO'
    },
    NOT_NOW: {
        ZH: '现在不可以看☺️',
        EN: 'NOT NOW☺️☺️☺️'
    },
    CAN_NOT_SEE: {
        ZH: '就是不给你看😛',
        EN: 'YOU CAN NOT SEE😛'
    },
    SHARE_TITLE: {
        ZH: '截屏分享 || 链接分享',
        EN: 'BY SCREENSHOT OR LINK'
    },
    COPY_LINK: {
        ZH: '复制链接',
        EN: 'COPY LINK'
    },
    COPIED: {
        ZH: '已复制',
        EN: 'COPIED'
    },
    ABOUT_TITLE: {
        ZH: '一个拼图游戏。可以上传图片。可以分享给别人。',
        EN: 'This is a photo puzzle game. You can upload your photo and share a puzzle game with others.'
    },
    AUTHOR: {
        ZH: '作者',
        EN: 'Author'
    },
    EMAIL: {
        ZH: '邮箱',
        EN: 'Email'
    },
    SOURCE_CODE: {
        ZH: '源代码',
        EN: 'Source Code'
    }
}

export const ZH = Object.freeze(_.mapValues(strings, 'ZH'))
export const EN = Object.freeze(_.mapValues(strings, 'EN'))
