import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { IMAGE_STATES } from '../constants/states'

class Home extends Component {
    render() {
        return (
            <article>
                Puzzle
                {
                    this.props.imgState === IMAGE_STATES.NOT_EXIST ? <Redirect to={{
                        pathname: '/share'
                    }} /> : 'haha'
                }
            </article>
        )
    }
}

export default connect(
    state => ({ imgState: state.puzzleImage.state })
)(Home)