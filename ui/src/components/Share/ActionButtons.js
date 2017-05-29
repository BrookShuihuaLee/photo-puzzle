import React, { Component } from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import _ from 'lodash'
import { Link } from 'react-router-dom'

import { triggerAdvanced, openSharingDialog } from '../../actions/updateForShareState'
import { IMAGE_STATES } from '../../constants/states'
import { preparePuzzle } from '../../actions/updateForPuzzleState'

const STYLES = {
    OPTION_BTN_CONTAINER_STYLE: {
        display: 'flex'
    },
    OPTION_BUTTON_STYLE: {
        flexGrow: 1,
        margin: 5
    }
}

class ActionButtons extends Component {
    render() {
        const {
            puzzleImage,
            forShare,
            languages: {
                SHARE,
                SIMPLE,
                ADVANCED,
                PLAY
            },

            triggerAdvanced,
            preparePuzzle,
            openSharingDialog
        } = this.props

        if (puzzleImage.state === IMAGE_STATES.NOT_EXIST) return null

        return (
            <ReactCSSTransitionGroup
                transitionName='fadeInOut'
                transitionEnterTimeout={500}
                transitionLeave={false}
                transitionAppear={true}
                transitionAppearTimeout={500}
            >
                <div style={STYLES.OPTION_BTN_CONTAINER_STYLE} >
                    <RaisedButton
                        label={SHARE}
                        style={STYLES.OPTION_BUTTON_STYLE}
                        secondary
                        onTouchTap={openSharingDialog}
                        disabled={puzzleImage.state !== IMAGE_STATES.EXIST}
                    />
                    <RaisedButton
                        label={forShare.showAdvanced ? SIMPLE : ADVANCED}
                        style={STYLES.OPTION_BUTTON_STYLE}
                        onTouchTap={triggerAdvanced}
                        disabled={puzzleImage.state !== IMAGE_STATES.EXIST}
                    />
                    {
                        puzzleImage.state !== IMAGE_STATES.EXIST ? (
                            <RaisedButton
                                label={PLAY}
                                style={STYLES.OPTION_BUTTON_STYLE}
                                primary
                                disabled={true}
                            />
                        ) : (
                                <Link
                                    to="/puzzle"
                                    replace
                                    style={STYLES.OPTION_BUTTON_STYLE}
                                >
                                    <RaisedButton
                                        label={PLAY}
                                        primary
                                        style={{
                                            width: '100%'
                                        }}
                                        onTouchTap={preparePuzzle}
                                    />
                                </Link>
                            )
                    }
                </div>
            </ReactCSSTransitionGroup >
        )
    }
}

export default connect(
    state => _.pick(state, ['puzzleImage', 'forShare', 'languages']),
    {
        triggerAdvanced,
        preparePuzzle,
        openSharingDialog
    }
)(ActionButtons)