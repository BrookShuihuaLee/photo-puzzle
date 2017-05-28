import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import Dialog from 'material-ui/Dialog'

import { closeSharingDialog } from '../../actions/updateForShareState'

class SharingDialog extends Component {
    render() {
        let {
            forShare,

            closeSharingDialog
        } = this.props

        return (
            <Dialog
                open={forShare.isSharing}
                onRequestClose={closeSharingDialog}
            >
            </Dialog>
        )
    }
}

export default connect(
    state => _.pick(state, ['forShare']),
    {
        closeSharingDialog
    }
)(SharingDialog)