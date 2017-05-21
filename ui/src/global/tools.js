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

async function canvasToBlob(canvas) {
    let a = canvas.toDataURL('image/png').split(',')
    let mime = a[0].match(/:(.*?);/)[1]
    let bstr = atob(a[1])
    let n = bstr.length
    let u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    let blob = new Blob([u8arr], { type: mime })
    return blob
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