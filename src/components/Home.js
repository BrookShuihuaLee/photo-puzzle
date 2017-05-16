import React, { Component } from 'react'
import { connect } from 'react-redux'
import { increase, decrease } from '../actions/count'
import { Redirect } from 'react-router-dom'

class Home extends Component {
    render() {
        return (
            <article>
                Some state changes:
                {this.props.number}
                <button onClick={() => this.props.increase(1)}>Increase</button>
                <button onClick={() => this.props.decrease(1)}>Decrease</button>
                {
                    this.props.number === 5 ? <Redirect to={{
                        pathname: '/bar'
                    }} /> : null
                }
            </article>
        )
    }
}

export default connect(
    state => ({ number: state.count.number }),
    { increase, decrease }
)(Home)
