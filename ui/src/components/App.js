import React, { Component } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { Menu, Puzzle, Share, About, _Home, Config } from '.'
import './App.less'
import { fadeOutLoadingPage } from '../apis/'

export default class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <Router>
                    <main>
                        <Menu />
                        <Route exact path='/' render={_Home} />
                        <Route path='/puzzle' component={Puzzle} />
                        <Route path='/share' component={Share} />
                        <Route path='/about' component={About} />
                        <Route path='/config/:config' component={Config} />
                    </main>
                </Router>
            </MuiThemeProvider>
        )
    }

    componentDidMount() {
        fadeOutLoadingPage()
    }
}
