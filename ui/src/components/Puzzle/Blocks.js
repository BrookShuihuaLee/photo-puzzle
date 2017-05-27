import React, { Component, f } from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'

import { BLOCK_MARGIN, BLOCK_MOVING_TIME } from '../../constants/puzzle'
import { requestNextFrame } from '../../global/tools'
import { clickBlock, checkGameOver } from '../../actions/updateForPuzzleState'

const STYLES = {
    BLOCK_CONTAINER_STYLE: {
        position: 'relative',
        marginBottom: 50
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
    _lastPositions = null

    async _move(index, lastX, lastY, x, y, blobUrl) {
        if (lastX === x && lastY === y) return
        this._lastPositions[index] = { x, y }
        await requestNextFrame()
        let e = findDOMNode(this.refs[blobUrl])
        let fromLeft = this._imageXToLeft(lastX)
        let fromTop = this._imageYToTop(lastY)
        let toLeft = this._imageXToLeft(x)
        let toTop = this._imageYToTop(y)
        let deltaLeft = toLeft - fromLeft
        let deltaTop = toTop - fromTop
        let start = new Date()
        let time
        while ((time = new Date() - start) < BLOCK_MOVING_TIME) {
            e.style.left = `${fromLeft + deltaLeft * time / BLOCK_MOVING_TIME}px`
            e.style.top = `${fromTop + deltaTop * time / BLOCK_MOVING_TIME}px`
            await requestNextFrame()
        }
        e.style.left = toLeft + 'px'
        e.style.top = toTop + 'px'
        this.props.checkGameOver()
    }

    _imageXToLeft(x) {
        return x * (this.props.forPuzzle.blockLen + BLOCK_MARGIN)
    }

    _imageYToTop(y) {
        return y * (this.props.forPuzzle.blockLen + BLOCK_MARGIN)
    }

    render() {
        let {
            forPuzzle,

            clickBlock
        } = this.props
        let { blockLen, vn, hn, lineColor } = forPuzzle
        if (!this._lastPositions) this._lastPositions = forPuzzle.blocks.map(({ x, y }) => ({ x, y }))
        let blocks = forPuzzle.blocks.map(({x, y, blobUrl }, index) => {
            let { x: lastX, y: lastY } = this._lastPositions[index]
            this._move(index, lastX, lastY, x, y, blobUrl)
            return <img
                ref={blobUrl}
                key={blobUrl}
                src={blobUrl}
                onTouchTap={() => clickBlock(index)}
                style={{
                    ...STYLES.BLOCK_STYLE,
                    left: this._imageXToLeft(lastX),
                    top: this._imageYToTop(lastY),
                    width: blockLen,
                    height: blockLen
                }}
            />
        })
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
                marginTop: 100 + (vn - hn) * 10,
                height: hn * (blockLen + BLOCK_MARGIN)
            }}>
                <div>{blocks}</div>
                <div>{lines}</div>
            </div>
        )
    }
}

export default connect(
    state => _.pick(state, ['forPuzzle']),
    {
        clickBlock,
        checkGameOver
    }
)(Blocks)