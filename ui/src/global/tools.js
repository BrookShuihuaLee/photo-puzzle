export async function blobToImage(blob) {
    return await new Promise(resolve => {
        const img = new Image()
        img.onload = () => {
            resolve(img)
        }
        img.src = URL.createObjectURL(blob)
    })
}

// export async function blobToResizedImage(blob) {
//     let img = await blobToImage(blob)
// }