import React, { Component } from 'react'
import { HashRouter as Router, Route, Redirect } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { Menu, Puzzle, Share, About } from '.'

export default class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <Router>
                    <main>
                        <Menu />
                        <Route exact path="/" render={() => <Redirect to="/puzzle" />} />
                        <Route path="/puzzle" component={Puzzle} />
                        <Route path="/share" component={Share} />
                        <Route path="/about" component={About} />
                    </main>
                </Router>
            </MuiThemeProvider>
        )
    }

    componentDidMount() {
        const loadingPage = document.getElementById('loadingPage')
        loadingPage.classList.add('fadeOut')
        setTimeout(() => {
            loadingPage.remove()
        }, 1000)
    }
}
