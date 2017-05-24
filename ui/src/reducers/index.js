import { combineReducers } from 'redux'

import puzzleImage from './puzzleImage'
import imageGrid from './imageGrid'
import forShare from './forShare'
import forPuzzle from './forPuzzle'

export default combineReducers ({
    puzzleImage,
    imageGrid,
    forShare,
    forPuzzle
})