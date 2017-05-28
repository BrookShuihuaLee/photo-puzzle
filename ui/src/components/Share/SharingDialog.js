import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import Dialog from 'material-ui/Dialog'
import QRCode from 'qrcode.react'
import Clipboard from 'clipboard-js'
import RaisedButton from 'material-ui/RaisedButton'

import { closeSharingDialog } from '../../actions/updateForShareState'
import { generateShareUrl } from '../../apis/'
import { sleep } from '../../global/tools'

const STYLES = {
    CONTAINER_STYLE: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    BUTTON_STYLE: {
        margin: 20
    },
    QRCODE_STYLE: {
        margin: 20
    }
}

class SharingDialog extends Component {
    state = {
        copied: false
    }

    async _copyUrl(shareUrl) {
        Clipboard.copy(shareUrl)
        this.setState({
            ...this.state,
            copied: true
        })
        await sleep(3000)
        this.setState({
            ...this.state,
            copied: false
        })
    }

    render() {
        let {
            forShare,
            puzzleImage: {
                path
            },
            imageGrid: {
                vn,
                hn
            },

            closeSharingDialog
        } = this.props
        let {
            copied
        } = this.state
        if (!forShare.isSharing) return null

        const shareUrl = generateShareUrl(path, vn, hn)

        return (
            <Dialog
                open={forShare.isSharing}
                onRequestClose={closeSharingDialog}
            >
                <div
                    style={STYLES.CONTAINER_STYLE}
                >
                    <QRCode
                        value={shareUrl}
                        style={STYLES.QRCODE_STYLE}
                    />
                    <RaisedButton
                        label={copied ? '已复制' : '复制链接'}
                        secondary={!copied}
                        onTouchTap={() => this._copyUrl(shareUrl)}
                        style={STYLES.BUTTON_STYLE}
                    />
                </div>
            </Dialog>
        )
    }
}

export default connect(
    state => _.pick(state, ['forShare', 'puzzleImage', 'imageGrid']),
    {
        closeSharingDialog
    }
)(SharingDialog)