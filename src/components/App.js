import React, { Component } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { Menu, Home, Bar, Foo } from '.'

export default class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <Router>
                    <main>
                        <Menu />
                        <Route exact path="/" component={Home} />
                        <Route path="/bar" component={Bar} />
                        <Route path="/foo" component={Foo} />
                    </main>
                </Router>
            </MuiThemeProvider>
        )
    }
}
