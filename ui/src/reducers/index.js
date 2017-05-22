import { combineReducers } from 'redux'

import puzzleImage from './puzzleImage'
import imageGrid from './imageGrid'
import forShare from './forShare'

export default combineReducers ({
    puzzleImage,
    imageGrid,
    forShare
})