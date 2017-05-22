import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import _ from 'lodash'

import {
    downloadImageRandom,
    uploadImage
} from '../../actions/updateImageState'
import { updatePaperHeight } from '../../actions/updateForShareState'
import { IMAGE_STATES } from '../../constants/states'

const STYLES = {
    CHOOSE_IMG_CONTAINER_STYLE: {
        display: 'flex'
    },
    CHOOSE_IMG_BTN_CONTAINER_STYLE: {
        marginTop: 50
    },
    CHOOSE_IMG_BTN_STYLE: {
        display: 'block',
        margin: '10px 20px',
        minWidth: '102px'
    },
    PAPER_STYLE: {
        width: '80%',
        margin: '10px auto',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    IMAGE_CONTAINER_STYLE: {
        flexGrow: 1
    },
    IMAGE_STYLE: {
        width: '100%'
    },
    HIDEN_INPUT_STYLE: {
        display: 'none'
    }
}

class ChoseImage extends Component {

    _uploadFile = () => {
        const input = this.refs.fileInput
        if (input.files.length) this.props.uploadImage(input.files[0])
    }

    render() {
        const {
            puzzleImage,
            forShare,

            downloadImageRandom,
            updatePaperHeight
        } = this.props

        if (puzzleImage.state === IMAGE_STATES.NOT_EXIST) setTimeout(() => {
            const paperRoot = findDOMNode(this.refs.paper)
            if (paperRoot.offsetWidth !== forShare.paperHeight) updatePaperHeight(paperRoot.offsetWidth)
        })

        return (
            <div style={STYLES.CHOOSE_IMG_CONTAINER_STYLE}>
                <div style={STYLES.CHOOSE_IMG_BTN_CONTAINER_STYLE}>
                    <RaisedButton label='随便来一张'
                        style={STYLES.CHOOSE_IMG_BTN_STYLE}
                        onTouchTap={downloadImageRandom}
                        disabled={puzzleImage.state !== IMAGE_STATES.NOT_EXIST && puzzleImage.state !== IMAGE_STATES.EXIST}
                    />
                    <RaisedButton label='上传照片'
                        style={STYLES.CHOOSE_IMG_BTN_STYLE}
                        onTouchTap={() => this.refs.fileInput.click()}
                        disabled={puzzleImage.state !== IMAGE_STATES.NOT_EXIST && puzzleImage.state !== IMAGE_STATES.EXIST}
                    />
                    <input
                        ref='fileInput'
                        type="file"
                        style={STYLES.HIDEN_INPUT_STYLE}
                        onChange={this._uploadFile}
                        accept='image/*'
                    />
                </div>
                <div style={STYLES.IMAGE_CONTAINER_STYLE}>
                    <ReactCSSTransitionGroup
                        transitionName='fadeInOut'
                        transitionEnterTimeout={500}
                        transitionLeave={false}
                        transitionAppear={true}
                        transitionAppearTimeout={500}
                    >
                        {
                            puzzleImage.blobUrl ?
                                <img key={`IMAGE${puzzleImage.blobUrl}`}
                                    src={puzzleImage.blobUrl}
                                    style={STYLES.IMAGE_STYLE}
                                /> :
                                <Paper
                                    key='PAPER'
                                    ref='paper'
                                    style={{
                                        ...STYLES.PAPER_STYLE,
                                        height: forShare.paperHeight
                                    }}
                                    zDepth={3}
                                    circle
                                    onTouchTap={() => this.refs.fileInput.click()}
                                >
                                    <span>照 片</span>
                                </Paper>

                        }
                    </ReactCSSTransitionGroup>
                </div>
            </div>
        )
    }
}

export default connect(
    state => _.pick(state, ['puzzleImage', 'imageGrid', 'forShare']),
    {
        downloadImageRandom,
        uploadImage,
        updatePaperHeight
    }
)(ChoseImage)