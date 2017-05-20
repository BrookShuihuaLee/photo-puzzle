import { BosClient } from 'bce-sdk-js'
import _ from 'lodash'

import { ORIGIN } from '../constants/others'

export function uploadImage(blob) {
    let prefix = new Date().getTime().toString(36)
    let surfix = (Math.random().toString(36) + '0000').substr(2, 4)
    return new BosClient({
        endpoint: ORIGIN,
        credentials: {
            ak: '800326b3ef7b41cda0a2943d4c49abed',
            sk: 'fb258923552c4be291ef8d24467fc162'
        }
    })
        .putObjectFromBlob('images', `${prefix}-${surfix}.png`, blob)
        .then(response => {
            console.log('uploadImage success: ', response)
            return true
        })
        .catch(error => {
            console.error('uploadImage failed: ', error)
            return false
        })
}

export async function downloadImage(path) {
    return {
        path,
        blob: await fetch(`${ORIGIN}/images/${path}`).then(res => res.blob())
    }
}

let defaultImages = null
export async function downloadImageRandom() {
    defaultImages = defaultImages || await fetch(`${ORIGIN}/images/default/index.json`).then(res => res.json())
    return await downloadImage(`default/${_.sample(defaultImages)}`)
}