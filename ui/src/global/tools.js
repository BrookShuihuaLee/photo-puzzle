import _ from 'lodash'

import { MAX_IMG_WIDTH } from '../constants/puzzle'

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