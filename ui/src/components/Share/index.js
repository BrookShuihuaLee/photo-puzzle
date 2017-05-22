import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import ChoseImage from './ChoseImage'
import Slides from './Slides'
import ActionButtons from './ActionButtons'

class Share extends Component {
    render() {
        return (
            <article>
                <ChoseImage />
                <Slides />
                <ActionButtons />
            </article>
        )
    }
}

export default withRouter(Share)