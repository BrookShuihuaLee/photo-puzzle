import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IMAGE_STATES } from '../../constants/states'

const STYLES = {
    ROOT: {
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

        if (puzzleImage.state !== IMAGE_STATES.EXIST || !(forShare.imageX || forShare.imageY)) return null
        return (
            <div style={{
                ...STYLES.ROOT,
                left: forShare.imageX,
                top: forShare.imageY
            }}>
                <div
                    style={{
                        width: 10,
                        height: puzzleImage.height,
                        backgroundColor: 'red'
                    }}
                />
            </div>
        )
    }
}

export default connect(
    state => _.pick(state, ['puzzleImage', 'imageGrid', 'forShare'])
)(GridLines)