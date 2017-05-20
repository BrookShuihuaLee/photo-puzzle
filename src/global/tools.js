import { BosClient } from 'bce-sdk-js'

export default uploadImage = (blob) => {
    let prefix = new Date().getTime().toString(36)
    let surfix = (Math.random().toString(36) + '0000').substr(2, 4)
    return new BosClient({
        endpoint: 'http://photo-puzzle.gz.bcebos.com',
        credentials: {
            ak: '800326b3ef7b41cda0a2943d4c49abed',
            sk: 'fb258923552c4be291ef8d24467fc162'
        }
    })
        .putObjectFromBlob('images', `${prefix}-${surfix}.png`, blob)
        .then(response => {
            console.log('uploadImage success: ', response)
        })
        .catch(error => {
            console.error('uploadImage failed: ', error)
        })
}