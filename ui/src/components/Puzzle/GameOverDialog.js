import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import { connect } from 'react-redux'
import { GridList, GridTile } from 'material-ui/GridList'
import { Link } from 'react-router-dom'
import IconButton from 'material-ui/IconButton'
import { teal500, pink500 } from 'material-ui/styles/colors'
import ReplayIcon from 'material-ui/svg-icons/av/replay'
import AutoRenewIcon from 'material-ui/svg-icons/action/autorenew'
import BubbleIcon from 'material-ui/svg-icons/editor/bubble-chart'

import { preparePuzzle } from '../../actions/updateForPuzzleState'
import { openSharingDialog } from '../../actions/updateForShareState'

const STYLES = {
    ORIGINAL_IMAGE_STYLE: {
        width: '100%'
    },
    GRID_ITEM_STYLE: {
        textAlign: 'center'
    },
    LINK_STYLE: {
        textDecoration: 'none'
    }
}

class GameOverDialog extends Component {
    render() {
        let {
            open,

            forPuzzle: {
                blobUrl
            },

            preparePuzzle,
            openSharingDialog
        } = this.props

        return (
            <Dialog
                open={open}
                autoScrollBodyContent={true}
            >
                <img src={blobUrl} style={STYLES.ORIGINAL_IMAGE_STYLE} />
                <GridList
                    cellHeight='auto'
                    cols={3}
                >
                    <GridTile style={STYLES.GRID_ITEM_STYLE} onTouchTap={preparePuzzle} >
                        <IconButton>
                            <ReplayIcon color={teal500} />
                        </IconButton>
                        <div style={{ color: teal500 }} >再来一次</div>
                    </GridTile>
                    <GridTile style={STYLES.GRID_ITEM_STYLE} >
                        <Link
                            to='/share'
                            replace
                            style={STYLES.LINK_STYLE}
                            onTouchTap={openSharingDialog}
                        >
                            <IconButton>
                                <BubbleIcon color={pink500} />
                            </IconButton>
                            <div style={{ color: pink500 }} >分享拼图</div>
                        </Link>
                    </GridTile>
                    <GridTile style={STYLES.GRID_ITEM_STYLE} >
                        <Link
                            to='/share'
                            replace
                            style={STYLES.LINK_STYLE}
                        >
                            <IconButton>
                                <AutoRenewIcon color={teal500} />
                            </IconButton>
                            <div style={{ color: teal500 }} >换一张图</div>
                        </Link>
                    </GridTile>
                </GridList>
            </Dialog>
        )
    }
}

export default connect(
    state => _.pick(state, ['forPuzzle']),
    {
        preparePuzzle,
        openSharingDialog
    }
)(GameOverDialog)