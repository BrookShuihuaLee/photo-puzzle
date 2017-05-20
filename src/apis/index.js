import { BosClient } from 'bce-sdk-js'
import _ from 'lodash'

import { ORIGIN } from '../constants/others'
import { blobToImage } from '../global/tools'

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
    console.log('downloading: ', path)
    let blob = await fetch(`${ORIGIN}/images/${path}`)
        .then(res => res.blob())
        .catch(e => console.log('dowload image error: ', e))
    let blobUrl = URL.createObjectURL(blob)
    let img = await blobToImage(blob)

    return {
        path,
        blob,
        blobUrl,
        width: img.naturalWidth,
        height: img.naturalHeight
    }
}

let defaultImages = null
export async function downloadImageRandom() {
    fetch(`${ORIGIN}/images/default/index.json`).then(res => res.text()).then(console.log)
    defaultImages = defaultImages || await fetch(`${ORIGIN}/images/default/index.json`)
        .then(res => {
            console.log('almost here')
            return res.json()
        })
        .catch(e => console.log('dowload image list error: ', e.message, e.stack))
    console.log('defaultImages: ', defaultImages)
    return await downloadImage(`default/${_.sample(defaultImages)}`)
}