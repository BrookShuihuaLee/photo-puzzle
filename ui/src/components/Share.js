import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import RaisedButton from 'material-ui/RaisedButton'
import { randomImage } from '../actions/updateImageState'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'

import { IMAGE_STATES } from '../constants/states'

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
    }
}

class Share extends Component {
    state = {
        paperHeight: 0
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
                paperHeight: paperRoot.offsetWidth
            })
        })

        return (
            <article>
                <div style={STYLES.CHOOSE_IMG_CONTAINER_STYLE}>
                    <div style={STYLES.CHOOSE_IMG_BTN_CONTAINER_STYLE}>
                        <RaisedButton label='随便来一张' style={STYLES.CHOOSE_IMG_BTN_STYLE} onTouchTap={this.props.randomImage} />
                        <RaisedButton label='上传照片' style={STYLES.CHOOSE_IMG_BTN_STYLE} />
                    </div>
                    <div style={STYLES.IMAGE_CONTAINER_STYLE}>
                        {
                            puzzleImage.blobUrl ?
                                <img src={puzzleImage.blobUrl} style={STYLES.IMAGE_STYLE} /> :
                                <Paper ref='paper' style={paperStyle} zDepth={3} circle >
                                    <span>照 片</span>
                                </Paper>

                        }
                    </div>
                </div>
                <div>
                    {puzzleImage.state.toString()}
                </div>
            </article>
        )
    }
}

export default connect(
    state => ({ puzzleImage: state.puzzleImage }),
    { randomImage }
)(Share)