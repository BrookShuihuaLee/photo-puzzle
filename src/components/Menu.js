import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ListIcon from 'material-ui/svg-icons/action/list'
import DashBoardIcon from 'material-ui/svg-icons/action/dashboard'
import MailIcon from 'material-ui/svg-icons/communication/mail-outline'
import ShareIcon from 'material-ui/svg-icons/social/share'
import Dialog from 'material-ui/Dialog'
import { GridList, GridTile } from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import { teal500 } from 'material-ui/styles/colors'

const STYLES = Object.freeze({
    MENU_ITEM_STYLE: {
        textAlign: 'center'
    },
    LINK_STYLE: {
        textDecoration: 'none'
    }
})

export default class Menu extends Component {
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
        return (
            <header>
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
                                to="/"
                                style={STYLES.LINK_STYLE}
                                onTouchTap={this.closeMenu}
                            >
                                <IconButton>
                                    <DashBoardIcon color={teal500} />
                                </IconButton>
                                <div style={{ color: teal500 }}>拼图</div>
                            </Link>
                        </GridTile>
                        <GridTile style={STYLES.MENU_ITEM_STYLE} >
                            <Link
                                to="/bar"
                                style={STYLES.LINK_STYLE}
                                onTouchTap={this.closeMenu}
                            >
                                <IconButton>
                                    <ShareIcon color={teal500} />
                                </IconButton>
                                <div style={{ color: teal500 }}>分享</div>
                            </Link>
                        </GridTile>
                        <GridTile style={STYLES.MENU_ITEM_STYLE} >
                            <Link
                                to="/foo"
                                style={STYLES.LINK_STYLE}
                                onTouchTap={this.closeMenu}
                            >
                                <IconButton>
                                    <MailIcon color={teal500} />
                                </IconButton>
                                <div style={{ color: teal500 }}>关于</div>
                            </Link>
                        </GridTile>
                    </GridList>
                </Dialog>
            </header>
        )
    }
}