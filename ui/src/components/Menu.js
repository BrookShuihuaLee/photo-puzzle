import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import _ from 'lodash'

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
        let {
            forPuzzle: {
                noShare
            }
        } = this.props

        let items = [
            {
                to: '/puzzle',
                text: '拼图'
            },
            ...noShare ? [] : [
                {
                    to: '/share',
                    text: '分享'
                }
            ],
            {
                to: '/about',
                text: '关于'
            }
        ]

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
                        cols={items.length}
                    >
                        {
                            items.map(({ to, text }) => (
                                <GridTile
                                    key={to}
                                    style={STYLES.MENU_ITEM_STYLE}
                                >
                                    <Link
                                        to={to}
                                        replace
                                        style={STYLES.LINK_STYLE}
                                    >
                                        <IconButton>
                                            <DashBoardIcon color={teal500} />
                                        </IconButton>
                                        <div style={{ color: teal500 }} >{text}</div>
                                    </Link>
                                </GridTile>
                            ))
                        }
                    </GridList>
                </Dialog>
            </header>
        )
    }
}

export default withRouter(connect(
    state => _.pick(state, ['forPuzzle']),
    {
    }
)(Menu))