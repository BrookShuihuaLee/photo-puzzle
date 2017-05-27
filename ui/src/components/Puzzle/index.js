import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'

import { IMAGE_STATES, PUZZLE_STATES } from '../../constants/states'
import { PUZZLE_MARGIN } from '../../constants/puzzle'
import { startPuzzle } from '../../actions/updateForPuzzleState'
import Blocks from './Blocks'

const STYLES = {
    PUZZLE_STYLE: {
        margin: PUZZLE_MARGIN
    }
}

class Puzzle extends Component {
    render() {
        const {
            puzzleImage,
            forPuzzle,

            startPuzzle
        } = this.props

        if (puzzleImage.state !== IMAGE_STATES.EXIST) return <Redirect to={{
            pathname: '/share'
        }} />
        if (forPuzzle.state === PUZZLE_STATES.READY) {
            setTimeout(() => {
                startPuzzle(document.body.offsetWidth)
            })
            return null
        }

        return (
            <article style={STYLES.PUZZLE_STYLE}>
                <Blocks />

                {'isOver:' + forPuzzle.isOver}
            </article>
        )
    }
}

export default withRouter(connect(
    state => _.pick(state, ['puzzleImage', 'forPuzzle']),
    {
        startPuzzle
    }
)(Puzzle))