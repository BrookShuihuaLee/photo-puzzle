import { UPDATE_IMAGE_GRID_STATE } from '../constants/actionTypes'
import { reverseMeanRGB, rgbToStr, blobToImage } from '../global/tools'

export function updateVerticalNum(vn) {
    return {
        type: UPDATE_IMAGE_GRID_STATE,
        state: {
            vn
        }
    }
}

export function updateHorizontalNum(hn) {
    return {
        type: UPDATE_IMAGE_GRID_STATE,
        state: {
            hn
        }
    }
}

export function updateGridLineColor(blob) {
    return async function (dispath) {
        let lineColor = rgbToStr(reverseMeanRGB(await blobToImage(blob)))
        dispath({
            type: UPDATE_IMAGE_GRID_STATE,
            state: {
                lineColor
            }
        })
        console.log('lineColor: ', lineColor)
    }
}