import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import _ from 'lodash'
import Dialog from 'material-ui/Dialog'
import QRCode from 'qrcode.react'
import Clipboard from 'clipboard'
import RaisedButton from 'material-ui/RaisedButton'
import Spinner from 'react-spinner-material'

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

    async _copyIng() {
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

    async _listenCopy(shareUrl) {
        await sleep()
        if (this._clipBoard) this._clipBoard.destroy()
        let e = findDOMNode(this.refs.copyBtn)
        this._clipBoard = new Clipboard(e, {
            text: () => {
                this._copyIng()
                return shareUrl
            }
        })
    }

    render() {
        let {
            forShare,
            puzzleImage: {
                path,
                isSyncing
            },
            imageGrid: {
                vn,
                hn
            },
            languages: {
                lang,
                SHARE_TITLE,
                COPY_LINK,
                COPIED,
                SYNCING_PHOTO
            },

            closeSharingDialog
        } = this.props
        let {
            copied
        } = this.state
        if (!forShare.isSharing) return null

        let shareUrl;
        if (!isSyncing) this._listenCopy(shareUrl = generateShareUrl(path, vn, hn, lang))

        return (
            <Dialog
                open={forShare.isSharing}
                onRequestClose={closeSharingDialog}
            >
                {
                    isSyncing ? (
                        <div
                            style={STYLES.CONTAINER_STYLE}
                        >
                            <Spinner width={100}
                                height={120}
                                spinnerColor={"#333"}
                                spinnerWidth={2}
                                show={true}
                                style={STYLES.QRCODE_STYLE}
                            />
                            <div
                                style={STYLES.BUTTON_STYLE}
                            >
                                {SYNCING_PHOTO}
                            </div>
                        </div>
                    ) : (
                            <div
                                style={STYLES.CONTAINER_STYLE}
                            >
                                <p>{SHARE_TITLE}</p>
                                <QRCode
                                    value={shareUrl}
                                    style={STYLES.QRCODE_STYLE}
                                />
                                <RaisedButton
                                    ref='copyBtn'
                                    label={copied ? COPIED : COPY_LINK}
                                    secondary={!copied}
                                    style={STYLES.BUTTON_STYLE}
                                />
                            </div>
                        )
                }
            </Dialog>
        )
    }
}

export default connect(
    state => _.pick(state, ['forShare', 'puzzleImage', 'imageGrid', 'languages']),
    {
        closeSharingDialog
    }
)(SharingDialog)