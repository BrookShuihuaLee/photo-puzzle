import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

class _Home extends Component {
    render() {
        return (
            <Redirect to='/puzzle' />
        )
    }
}

export default withRouter(_Home)