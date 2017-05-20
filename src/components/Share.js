import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { randomImage } from '../actions/updateImageState'
import { connect } from 'react-redux'

const STYLES = {
    CHOOSE_IMG_CONTAINER_STYLE: {
        display: 'flex'
    },
    CHOOSE_IMG_BTN_CONTAINER_STYLE: {
        marginTop: 50
    },
    IMAGE_CONTAINER_STYLE: {
        flexGrow: 1,
        background: 'green'
    },
    BUTTON_STYLE: {
        display: 'block',
        margin: '10px 20px'
    }
}

class Share extends Component {
    state = {
        imageHeight: undefined
    }

    render() {
        let imageContainerStyle = {
            ...STYLES.IMAGE_CONTAINER_STYLE,
            height: this.state.imageHeight
        }
        setTimeout(() => {
            if (this.state.imageHeight !== this.refs.imageContainer.offsetWidth) {
                this.setState({
                    imageHeight: this.refs.imageContainer.offsetWidth
                })
            }
        })
        return (
            <article>
                <div style={STYLES.CHOOSE_IMG_CONTAINER_STYLE}>
                    <div style={STYLES.CHOOSE_IMG_BTN_CONTAINER_STYLE}>
                        <RaisedButton label='随便来一张' style={STYLES.BUTTON_STYLE} onTouchTap={this.props.randomImage} />
                        <RaisedButton label='上传照片' style={STYLES.BUTTON_STYLE} />
                    </div>
                    <div ref='imageContainer' style={imageContainerStyle}>
                        IMAGE_CONTAINER_STYLE
                    </div>
                </div>
                <div>{this.props.imgState.toString()}</div>
            </article>
        )
    }
}

export default connect(
    state => ({ imgState: state.puzzleImage.state }),
    { randomImage }
)(Share)