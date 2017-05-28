import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import ChoseImage from './ChoseImage'
import Slides from './Slides'
import ActionButtons from './ActionButtons'
import GridLines from './GridLines'
import SharingDialog from './SharingDialog'

class Share extends Component {
    render() {
        return (
            <article>
                <ChoseImage />
                <Slides />
                <ActionButtons />
                <GridLines />
                <SharingDialog />
            </article>
        )
    }
}

export default withRouter(Share)