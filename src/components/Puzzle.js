import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { IMAGE_STATES } from '../global/constants/states'

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

/*class Home extends Component {
    render() {
        return (
            <article>
                Some state changes:
                {this.props.number}
                <button onClick={() => this.props.increase(1)}>Increase</button>
                <button onClick={() => this.props.decrease(1)}>Decrease</button>
                {
                    this.props.number === 5 ? <Redirect to={{
                        pathname: '/share'
                    }} /> : null
                }
            </article>
        )
    }
}

export default connect(
    state => ({ number: state.count.number }),
    { increase, decrease }
)(Home)*/