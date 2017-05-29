import _ from 'lodash'

import { MAX_IMG_WIDTH, BLOCK_MARGIN } from '../constants/puzzle'

export async function blobToImage(blob) {
    return await new Promise(resolve => {
        const img = new Image()
        img.onload = () => {
            resolve(img)
        }
        img.src = URL.createObjectURL(blob)
    })
}

async function canvasToBlob(canvas, quality) {
    return await new Promise(resolve => {
        canvas.toBlob(resolve, 'image/png', quality)
    })
}

export async function resizeBlobImage(blob) {
    let img = await blobToImage(blob)
    let width = img.naturalWidth
    let height = img.naturalHeight

    async function refreshVarsBy(canvas) {
        blob = await canvasToBlob(canvas)
        img = await blobToImage(blob)
        width = img.naturalWidth
        height = img.naturalHeight
    }
    async function rotate() {
        console.log('before rotate: ', width, height)
        let canvas = document.createElement('canvas')
        canvas.width = height
        canvas.height = width
        let ctx = canvas.getContext('2d')
        ctx.rotate(Math.PI / 2)
        ctx.drawImage(img, 0, -height)
        await refreshVarsBy(canvas)
        console.log('after rotate: ', width, height)
    }
    async function shrink() {
        console.log('before shrink: ', width, height)
        let canvas = document.createElement('canvas')
        let w = MAX_IMG_WIDTH
        let h = Math.round(w / width * height)
        canvas.width = w
        canvas.height = h
        let ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, w, h)
        await refreshVarsBy(canvas)
        console.log('after shrink: ', width, height)
    }
    async function crop() {
        console.log('before crop: ', width, height)
        let canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = width << 1
        let ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, width << 1, 0, 0, width, width << 1)
        await refreshVarsBy(canvas)
        console.log('after crop: ', width, height)
    }

    if (width > height) await rotate()
    if (width > MAX_IMG_WIDTH) await shrink()
    if (width << 1 < height) await crop()

    return {
        blob,
        blobUrl: URL.createObjectURL(blob),
        width,
        height
    }
}

export function imageToImageData(img) {
    let canvas = document.createElement('canvas')
    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight
    let ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0)
    return ctx.getImageData(0, 0, img.naturalWidth, img.naturalHeight).data
}

export function* genRGBByImageData(data) {
    let n = data.length >> 2
    for (let i = 0; i < n; i++) {
        yield [data[i << 2], data[(i << 2) + 1], data[(i << 2) + 2]]
    }
}

export function meanRGB(img) {
    let data = imageToImageData(img)
    let n = data.length >> 2
    let r = 0
    let g = 0
    let b = 0
    for (let rgb of genRGBByImageData(data)) {
        r += rgb[0]
        g += rgb[1]
        b += rgb[2]
    }
    r = Math.round(r / n)
    g = Math.round(g / n)
    b = Math.round(b / n)
    return { r, g, b }
}

export function reverseMeanRGB(img) {
    let { r, g, b } = meanRGB(img)
    let f = x => x > 127 ? _.random(0, 105) : _.random(150, 255)
    r = f(r)
    g = f(g)
    b = f(b)
    return { r, g, b }
}

export function rgbToStr(rgb) {
    return `rgb(${rgb.r},${rgb.g},${rgb.b})`
}

export async function splitImg(blob, vn, hn, width, hasLast) {
    let blockLen = (width - BLOCK_MARGIN * (vn - 1)) / vn
    let img = await blobToImage(blob)
    let canvas = document.createElement('canvas')
    canvas.width = canvas.height = blockLen
    let ctx = canvas.getContext('2d')
    let sw = img.naturalWidth
    let sh = img.naturalHeight
    let sourceBlockLen = Math.min(sw / vn, sh / hn)
    let shimTop = (sh - sourceBlockLen * hn) / 2
    let shimLeft = (sw - sourceBlockLen * vn) / 2

    let blocks = []
    for (let i = 0; i < hn; i++) {
        for (let j = 0; j < vn; j++) {
            if (i === hn - 1 && j === vn - 1) continue
            ctx.drawImage(
                img,
                shimLeft + j * sourceBlockLen,
                shimTop + i * sourceBlockLen,
                sourceBlockLen,
                sourceBlockLen,
                0,
                0,
                blockLen,
                blockLen
            )
            blocks.push({
                blobUrl: URL.createObjectURL(await canvasToBlob(canvas))
            })
        }
    }

    return {
        blockLen,
        blocks
    }
}

function isValidSequence(a) {
    let reversedOrderNum = 0
    for (let i = 0; i < a.length; i++) {
        for (let j = i + 1; j < a.length; j++) {
            if (a[i] > a[j]) reversedOrderNum++
        }
    }
    return !(reversedOrderNum % 2)
}

export function randomSequence(n) {
    let a = _.shuffle(_.range(n))
    if (!isValidSequence(a)) [a[0], a[1]] = [a[1], a[0]]
    return a
}

export async function requestNextFrame() {
    await new Promise(requestAnimationFrame)
}

export async function sleep(t) {
    await new Promise(r => setTimeout(r, t))
}

export function isAdjacent({ x: x1, y: y1 }, { x: x2, y: y2 }) {
    return x1 === x2 && Math.abs(y1 - y2) === 1 || y1 === y2 && Math.abs(x1 - x2) === 1
}

export function swapPosition(p1, p2) {
    [p1.x, p1.y, p2.x, p2.y] = [p2.x, p2.y, p1.x, p1.y]
}

export function changeTitle(title) {
    document.title = title
}