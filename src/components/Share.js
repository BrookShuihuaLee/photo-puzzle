import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'

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

export default class Foo extends Component {
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
                        <RaisedButton label='随机来一张' style={STYLES.BUTTON_STYLE} />
                        <RaisedButton label='上传照片' style={STYLES.BUTTON_STYLE} />
                    </div>
                    <div ref='imageContainer' style={imageContainerStyle}>
                        IMAGE_CONTAINER_STYLE
                    </div>
                </div>
                <div>haha</div>
            </article>
        )
    }
}
