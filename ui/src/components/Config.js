import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

import { initializeConfig } from '../actions/configInit'
import { decodeConfig, showLoadingPage, fadeOutLoadingPage } from '../apis'

class Config extends Component {
    _decodeConfig = async () => {
        let {
            match,
            history
        } = this.props
        const config = decodeConfig(match.params.config)
        console.log('config: ', config)
        showLoadingPage()
        await this.props.initializeConfig(config)
        fadeOutLoadingPage()
        history.push('/')
    }

    render() {
        setTimeout(this._decodeConfig)
        return null
    }
}

export default withRouter(connect(
    state => ({}),
    {
        initializeConfig
    }
)(Config))