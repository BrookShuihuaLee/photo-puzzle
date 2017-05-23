import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'

import { IMAGE_STATES } from '../constants/states'

class Puzzle extends Component {
    render() {
        const {
            puzzleImage,
            imageGrid,
            forShare
        } = this.props

        if (puzzleImage.state !== IMAGE_STATES.EXIST) return <Redirect to={{
            pathname: '/share'
        }} />
        return (
            <article>
                Puzzle
            </article>
        )
    }
}

export default withRouter(connect(
    state => _.pick(state, ['puzzleImage', 'imageGrid', 'forShare'])
)(Puzzle))