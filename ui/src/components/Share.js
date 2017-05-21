import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import Slider from 'material-ui/Slider'

import { IMAGE_STATES } from '../constants/states'
import { MIN_PARTS_NUM, MAX_PARTS_NUM } from '../constants/puzzle'
import {
    downloadImageRandom,
    uploadImage
} from '../actions/updateImageState'

import {
    updateVerticalNum,
    updateHorizontalNum
} from '../actions/updateImageGridState'

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
    },

    SLIDE_CONTAINER_STYLE: {
        display: 'flex',
        alignItems: 'center'
    },
    SLIDE_STYLE: {
        flexGrow: 1
    },
    SLIDE_INNER_STYLE: {
        marginTop: 10,
        marginBottom: 10
    },
    SLIDE_NUM_STYLE: {
        width: 50,
        textAlign: 'center'
    },

    OPTION_BTN_CONTAINER_STYLE: {
        display: 'flex'
    },
    OPTION_BUTTON_STYLE: {
        flexGrow: 1,
        margin: 5
    }
}

class Share extends Component {
    state = {
        paperHeight: 0,
        showAdvanced: false
    }

    _uploadFile = () => {
        const input = this.refs.fileInput
        console.log(input.files)
        if (input.files.length) this.props.uploadImage(input.files[0])
    }

    _triggerAdvanced = () => {
        this.setState({
            ...this.state,
            showAdvanced: !this.state.showAdvanced
        })
    }

    render() {
        const { puzzleImage } = this.props
        const { paperHeight } = this.state
        const paperStyle = {
            ...STYLES.PAPER_STYLE,
            height: paperHeight
        }
        if (puzzleImage.state === IMAGE_STATES.NOT_EXIST) setTimeout(() => {
            const paperRoot = findDOMNode(this.refs.paper)
            if (paperRoot.offsetWidth !== paperHeight) this.setState({
                ...this.state,
                paperHeight: paperRoot.offsetWidth
            })
        })

        return (
            <article>
                <div style={STYLES.CHOOSE_IMG_CONTAINER_STYLE}>
                    <div style={STYLES.CHOOSE_IMG_BTN_CONTAINER_STYLE}>
                        <RaisedButton label='随便来一张'
                            style={STYLES.CHOOSE_IMG_BTN_STYLE}
                            onTouchTap={this.props.downloadImageRandom}
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
                            onBlur={console.log}
                            accept='image/*'
                        />
                    </div>
                    <div style={STYLES.IMAGE_CONTAINER_STYLE}>
                        {
                            puzzleImage.blobUrl ?
                                <img src={puzzleImage.blobUrl} style={STYLES.IMAGE_STYLE} /> :
                                <Paper
                                    ref='paper'
                                    style={paperStyle}
                                    zDepth={3}
                                    circle
                                    onTouchTap={() => this.refs.fileInput.click()}
                                >
                                    <span>照 片</span>
                                </Paper>

                        }
                    </div>
                </div>
                {
                    this.state.showAdvanced ?
                        <div>
                            <div style={STYLES.SLIDE_CONTAINER_STYLE} >
                                <div>垂直格子数：</div>
                                <Slider
                                    min={MIN_PARTS_NUM}
                                    max={MAX_PARTS_NUM}
                                    step={1}
                                    value={this.props.imageGrid.vn}
                                    onChange={(e, v) => this.props.updateVerticalNum(v)}
                                    style={STYLES.SLIDE_STYLE}
                                    sliderStyle={STYLES.SLIDE_INNER_STYLE}
                                />
                                <div style={STYLES.SLIDE_NUM_STYLE} >{this.props.imageGrid.vn}</div>
                            </div>
                            <div style={STYLES.SLIDE_CONTAINER_STYLE} >
                                <div>水平格子数：</div>
                                <Slider
                                    min={MIN_PARTS_NUM}
                                    max={MAX_PARTS_NUM}
                                    step={1}
                                    value={this.props.imageGrid.hn}
                                    onChange={(e, v) => this.props.updateHorizontalNum(v)}
                                    style={STYLES.SLIDE_STYLE}
                                    sliderStyle={STYLES.SLIDE_INNER_STYLE}
                                />
                                <div style={STYLES.SLIDE_NUM_STYLE} >{this.props.imageGrid.hn}</div>
                            </div>
                        </div> :
                        <br/>
                }
                <div style={STYLES.OPTION_BTN_CONTAINER_STYLE} >
                    <RaisedButton
                        label='分享'
                        style={STYLES.OPTION_BUTTON_STYLE}
                        secondary
                    />
                    <RaisedButton
                        label={this.state.showAdvanced ? '简洁' : '高级'}
                        style={STYLES.OPTION_BUTTON_STYLE}
                        onTouchTap={this._triggerAdvanced}
                    />
                    <RaisedButton
                        label='开始游戏'
                        style={STYLES.OPTION_BUTTON_STYLE}
                        primary
                    />
                </div>

                {puzzleImage.state.toString()}
            </article>
        )
    }
}

export default connect(
    state => ({
        puzzleImage: state.puzzleImage,
        imageGrid: state.imageGrid
    }),
    {
        downloadImageRandom,
        uploadImage,
        updateVerticalNum,
        updateHorizontalNum
    }
)(Share)