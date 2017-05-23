import React, { Component } from 'react'
import { connect } from 'react-redux'
import Slider from 'material-ui/Slider'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import _ from 'lodash'

import {
    updateVerticalNum,
    updateHorizontalNum
} from '../../actions/updateImageGridState'
import { MIN_PARTS_NUM, MAX_PARTS_NUM } from '../../constants/puzzle'

const STYLES = {
    SLIDES_CONTAINER_STYLE: {
        height: 76
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
    }
}

class Slides extends Component {
    render() {
        const {
            imageGrid,
            forShare,

            updateVerticalNum,
            updateHorizontalNum
        } = this.props

        return (
            <div style={STYLES.SLIDES_CONTAINER_STYLE}>
                <ReactCSSTransitionGroup
                    transitionName='fadeInOut'
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                >{
                        forShare.showAdvanced ?
                            <div>
                                <div style={STYLES.SLIDE_CONTAINER_STYLE} >
                                    <div>垂直划分：</div>
                                    <Slider
                                        min={MIN_PARTS_NUM}
                                        max={MAX_PARTS_NUM}
                                        step={1}
                                        value={imageGrid.vn}
                                        onChange={(e, v) => updateVerticalNum(v)}
                                        style={STYLES.SLIDE_STYLE}
                                        sliderStyle={STYLES.SLIDE_INNER_STYLE}
                                    />
                                    <div style={STYLES.SLIDE_NUM_STYLE} >{imageGrid.vn}</div>
                                </div>
                                <div style={STYLES.SLIDE_CONTAINER_STYLE} >
                                    <div>水平划分：</div>
                                    <Slider
                                        min={MIN_PARTS_NUM}
                                        max={MAX_PARTS_NUM}
                                        step={1}
                                        value={imageGrid.hn}
                                        onChange={(e, v) => updateHorizontalNum(v)}
                                        style={STYLES.SLIDE_STYLE}
                                        sliderStyle={STYLES.SLIDE_INNER_STYLE}
                                    />
                                    <div style={STYLES.SLIDE_NUM_STYLE} >{imageGrid.hn}</div>
                                </div>
                            </div>
                            :
                            null
                    }
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}

export default connect(
    state => _.pick(state, ['imageGrid', 'forShare']),
    {
        updateVerticalNum,
        updateHorizontalNum
    }
)(Slides)