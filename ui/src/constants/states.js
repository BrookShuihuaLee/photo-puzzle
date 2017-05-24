export const IMAGE_STATES = Object.freeze({
    NOT_EXIST: Symbol('NOT_EXIST'),
    UPLOADING: Symbol('UPLOADING'),
    DOWNLOADING: Symbol('DOWNLOADING'),
    EXIST: Symbol('EXIST')
})

export const PUZZLE_STATES = Object.freeze({
    READY: Symbol('READY'),
    PLAYING: Symbol('PLAYING'),
    END: Symbol('END')
})