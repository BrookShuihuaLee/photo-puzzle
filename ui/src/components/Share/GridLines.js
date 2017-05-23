import React, { Component } from 'react'
import { connect } from 'react-redux'

import { IMAGE_STATES } from '../../constants/states'
import { GRID_LINE_WIDTH } from '../../constants/puzzle'

const STYLES = {
    ROOT_STYLE: {
        position: 'absolute'
    },
    LINE_STYLE: {
        position: 'absolute'
    },
    MASK_STYLE: {
        position: 'absolute'
    }
}

class GridLines extends Component {
    render() {
        const {
            puzzleImage,
            imageGrid,
            forShare
        } = this.props

        if (puzzleImage.state !== IMAGE_STATES.EXIST || !imageGrid.lineColor || !forShare.imageW || !forShare.imageH) return null

        let deltaW = forShare.imageW / imageGrid.vn
        let deltaH = forShare.imageH / imageGrid.hn
        let delta = Math.min(deltaW, deltaH)
        let gridW = delta * imageGrid.vn
        let gridH = delta * imageGrid.hn
        let shimTop = (forShare.imageH - gridH) / 2
        let shimLeft = (forShare.imageW - gridW) / 2
        let lines = []
        for (let i = 1; i < imageGrid.vn; i++) lines.push({
            left: shimLeft + delta * i - GRID_LINE_WIDTH / 2,
            top: shimTop,
            width: GRID_LINE_WIDTH,
            height: forShare.imageH - shimTop * 2
        })
        for (let i = 1; i < imageGrid.hn; i++) lines.push({
            left: shimLeft,
            top: shimTop + delta * i - GRID_LINE_WIDTH / 2,
            width: forShare.imageW - shimLeft * 2,
            height: GRID_LINE_WIDTH
        })

        let maskColor = `rgba(${imageGrid.lineColor.match(/\d.*\d/)[0]}, 0.5)`
        return (
            <div style={{
                ...STYLES.ROOT_STYLE,
                left: forShare.imageX,
                top: forShare.imageY
            }}>
                <div>
                    {
                        lines.map(({ left, top, width, height }) => <div
                            key={`${left},${top}`}
                            style={{
                                ...STYLES.LINE_STYLE,
                                left,
                                top,
                                width,
                                height,
                                backgroundColor: imageGrid.lineColor
                            }}
                        />)
                    }
                </div>
                <div>
                    <div style={{
                        ...STYLES.MASK_STYLE,
                        backgroundColor: maskColor,
                        width: forShare.imageW,
                        height: shimTop,
                        left: 0,
                        top: 0
                    }} />
                    <div style={{
                        ...STYLES.MASK_STYLE,
                        backgroundColor: maskColor,
                        width: forShare.imageW,
                        height: shimTop,
                        left: 0,
                        top: shimTop + gridH
                    }} />
                    <div style={{
                        ...STYLES.MASK_STYLE,
                        backgroundColor: maskColor,
                        width: shimLeft,
                        height: forShare.imageH,
                        left: 0,
                        top: 0
                    }} />
                    <div style={{
                        ...STYLES.MASK_STYLE,
                        backgroundColor: maskColor,
                        width: shimLeft,
                        height: forShare.imageH,
                        left: shimLeft + gridW,
                        top: 0
                    }} />
                </div>
            </div>
        )
    }
}

export default connect(
    state => _.pick(state, ['puzzleImage', 'imageGrid', 'forShare'])
)(GridLines)