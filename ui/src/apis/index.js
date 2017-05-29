import _ from 'lodash'

import { ORIGIN, INDEX_URL } from '../constants/puzzle'
import {
    blobToImage,
    resizeBlobImage,
    splitImg,
    randomSequence,
    isAdjacent,
    swapPosition
} from '../global/tools'
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

export async function splitImage(blob, vn, hn, width) {
    try {
        let {
            blockLen,
            blocks
        } = await splitImg(blob, vn, hn, width)
        function positionToXY(p) {
            return {
                x: p % vn,
                y: Math.floor(p / vn)
            }
        }
        let emptyBlock = positionToXY(_.random(vn * hn - 2))
        randomSequence(vn * hn - 1).forEach((to, from) => {
            let x = to % vn
            let y = Math.floor(to / vn)
            if (x === vn - 1 && y >= emptyBlock.y) y++
            else if (y === emptyBlock.y && x >= emptyBlock.x) x++
            Object.assign(blocks[from], { x, y })
        })
        return {
            blockLen,
            blocks,
            emptyBlock
        }
    } catch (e) {
        console.error('split image error: ', e)
        alert('分割图片失败')
    }
}

export function clickBlock(block, emptyBlock) {
    if (isAdjacent(block, emptyBlock)) {
        swapPosition(block, emptyBlock)
        console.log('click block valid: ', block, emptyBlock)
        return true
    } else {
        console.log('click block invalid: ', block, emptyBlock)
        return false
    }
}

export function gameIsOver(blocks, emptyBlock, vn, hn) {
    return (
        emptyBlock.x === vn - 1 &&
        emptyBlock.y === hn - 1 &&
        blocks.every((block, i) => block.x === i % vn && block.y === Math.floor(i / vn))
    )
}

function encodeConfig(path, vn, hn, lang) {
    let config = {}
    if (path && vn && hn) Object.assign(config, {
        path,
        vn,
        hn
    })
    if (lang) config.lang = lang
    return btoa(JSON.stringify(config))
}

export function generateShareUrl(path, vn, hn, lang) {
    return `${INDEX_URL}#/config/${encodeConfig(path, vn, hn, lang)}`
}

export function decodeConfig(config) {
    return JSON.parse(atob(config))
}

export function fadeOutLoadingPage() {
    const loadingPage = document.getElementById('loadingPage')
    loadingPage.classList.remove('fadeIn')
    loadingPage.classList.add('fadeOut')
    setTimeout(() => loadingPage.style.display = 'none', 1000)
    return loadingPage
}

export function showLoadingPage() {
    const loadingPage = document.getElementById('loadingPage')
    loadingPage.classList.remove('fadeOut')
    loadingPage.style.display = null
    return loadingPage
}

export function fadeInLoadingPage() {
    const loadingPage = showLoadingPage()
    loadingPage.classList.add('fadeIn')
    return loadingPage
}