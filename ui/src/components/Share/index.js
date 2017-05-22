import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import ChoseImage from './ChoseImage'
import Slides from './Slides'
import ActionButtons from './ActionButtons'
import GridLines from './GridLines'

class Share extends Component {
    render() {
        return (
            <article>
                <ChoseImage />
                <Slides />
                <ActionButtons />
                <GridLines />
            </article>
        )
    }
}

export default withRouter(Share)