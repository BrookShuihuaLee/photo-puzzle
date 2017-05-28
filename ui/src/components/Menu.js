import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ListIcon from 'material-ui/svg-icons/action/list'
import DashBoardIcon from 'material-ui/svg-icons/action/dashboard'
import FaceIcon from 'material-ui/svg-icons/action/face'
import ShareIcon from 'material-ui/svg-icons/social/share'
import Dialog from 'material-ui/Dialog'
import { GridList, GridTile } from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import { teal500 } from 'material-ui/styles/colors'

const STYLES = {
    HEADER_STYLE: {
        position: 'absolute',
        left: '10px',
        top: '10px'
    },
    MENU_ITEM_STYLE: {
        textAlign: 'center'
    },
    LINK_STYLE: {
        textDecoration: 'none'
    }
}

class Menu extends Component {
    state = {
        open: false
    }

    openMenu = () => {
        this.setState({ open: true })
    }

    closeMenu = () => {
        this.setState({ open: false })
    }

    render() {
        if (this._lastLocation !== this.props.location) setTimeout(this.closeMenu)
        this._lastLocation = this.props.location
        return (
            <header style={STYLES.HEADER_STYLE}>
                <FloatingActionButton
                    mini={true}
                    onTouchTap={this.openMenu}
                >
                    <ListIcon />
                </FloatingActionButton>
                <Dialog
                    open={this.state.open}
                    onRequestClose={this.closeMenu}
                >
                    <GridList
                        cellHeight='auto'
                        cols={3}
                    >
                        <GridTile style={STYLES.MENU_ITEM_STYLE} >
                            <Link
                                to='/puzzle'
                                replace
                                style={STYLES.LINK_STYLE}
                            >
                                <IconButton>
                                    <DashBoardIcon color={teal500} />
                                </IconButton>
                                <div style={{ color: teal500 }} >拼图</div>
                            </Link>
                        </GridTile>
                        <GridTile style={STYLES.MENU_ITEM_STYLE} >
                            <Link
                                to='/share'
                                replace
                                style={STYLES.LINK_STYLE}
                            >
                                <IconButton>
                                    <ShareIcon color={teal500} />
                                </IconButton>
                                <div style={{ color: teal500 }} >分享</div>
                            </Link>
                        </GridTile>
                        <GridTile style={STYLES.MENU_ITEM_STYLE} >
                            <Link
                                to='/about'
                                replace
                                style={STYLES.LINK_STYLE}
                            >
                                <IconButton>
                                    <FaceIcon color={teal500} />
                                </IconButton>
                                <div style={{ color: teal500 }} >关于</div>
                            </Link>
                        </GridTile>
                    </GridList>
                </Dialog>
            </header>
        )
    }
}

export default withRouter(Menu)