import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

class Config extends Component {
    render() {
        let {
            match
        } = this.props
        const config = JSON.parse(atob(match.params.config))
        console.log('config: ', config)
        return (
            <Redirect to='/' />
        )
    }
}

export default withRouter(Config)