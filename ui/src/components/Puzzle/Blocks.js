import React, { Component } from 'react'
import { connect } from 'react-redux'

import { BLOCK_MARGIN } from '../../constants/puzzle'

const STYLES = {
    BLOCK_CONTAINER_STYLE: {
        position: 'relative'
    },
    BLOCK_STYLE: {
        position: 'absolute'
    },
    LINE_STYLE: {
        position: 'absolute',
        animation: 'twinkle 5s infinite'
    }
}

class Blocks extends Component {
    render() {
        let {
            forPuzzle,
            imageGrid
        } = this.props
        let blockLen = forPuzzle.blockLen
        let { vn, hn, lineColor } = imageGrid
        let blocks = forPuzzle.blocks.map(({ x, y, blobUrl }) => <img
            key={blobUrl}
            src={blobUrl}
            style={{
                ...STYLES.BLOCK_STYLE,
                left: x * (blockLen + BLOCK_MARGIN),
                top: y * (blockLen + BLOCK_MARGIN),
                width: blockLen,
                height: blockLen
            }}
        />)
        let lines = []
        for (let i = 1; i < vn; i++) {
            lines.push(<div
                key={`i${i}`}
                style={{
                    ...STYLES.LINE_STYLE,
                    left: i * (blockLen + BLOCK_MARGIN) - BLOCK_MARGIN,
                    top: 0,
                    width: BLOCK_MARGIN,
                    height: hn * (blockLen + BLOCK_MARGIN) - BLOCK_MARGIN,
                    backgroundColor: lineColor
                }}
            />)
        }
        for (let j = 1; j < hn; j++) {
            lines.push(<div
                key={`j${j}`}
                style={{
                    ...STYLES.LINE_STYLE,
                    left: 0,
                    top: j * (blockLen + BLOCK_MARGIN) - BLOCK_MARGIN,
                    width: vn * (blockLen + BLOCK_MARGIN) - BLOCK_MARGIN,
                    height: BLOCK_MARGIN,
                    backgroundColor: lineColor
                }}
            />)
        }

        return (
            <div style={{
                ...STYLES.BLOCK_CONTAINER_STYLE,
                marginTop: 100 + (vn - hn) * 10
            }}>
                <div>{blocks}</div>
                <div>{lines}</div>
            </div>
        )
    }
}

export default connect(
    state => _.pick(state, ['forPuzzle', 'imageGrid'])
)(Blocks)