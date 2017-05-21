import _ from 'lodash'

import { ORIGIN } from '../constants/puzzle'
import { blobToImage, resizeBlobImage } from '../global/tools'
import cos from './cos-sdk'

export async function uploadImage(blob) {
    try {
        return await resizeBlobImage(blob)
    } catch (e) {
        console.error('uploading image error: ', e)
        alert('上传图片失败')
    }
}

export async function syncImage(blob) {
    let prefix = new Date().getTime().toString(36)
    let surfix = (Math.random().toString(36) + '0000').substr(2, 4)
    let extension = blob.name && _.last(blob.name.split('.')) || 'png'
    let path = `${prefix}-${surfix}.${extension}`
    console.log('syncing image: ', path, blob)
    try {
        await cos.uploadFile(`images/${path}`, blob)
        return path
    } catch (e) {
        console.error('syncing image error: ', e)
        alert('同步图片失败')
    }
}

export async function downloadImage(path) {
    console.log('downloading image: ', path)
    try {
        let blob = await (await fetch(`${ORIGIN}/images/${path}`)).blob()

        return {
            path,
            ...await resizeBlobImage(blob)
        }
    } catch (e) {
        console.error('downloading image error: ', e)
        alert('下载图片失败')
    }
}

let defaultImages = null
export async function downloadImageRandom(pathNow) {
    try {
        defaultImages = defaultImages || await (await fetch(`${ORIGIN}/images/default/index.json`)).json()
    } catch (e) {
        console.error('dowloading image list error: ', e)
        alert('下载图片失败')
    }
    return await downloadImage(`default/${_.sample(defaultImages.filter(p => `default/${p}` !== pathNow))}`)
}