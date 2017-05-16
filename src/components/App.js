import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

import { Home, Bar, Foo } from '.'

export default class App extends Component {
    render() {
        return (
            <Router>
                <main>
                    <header>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/bar">Bar</Link></li>
                            <li><Link to="/foo">Foo</Link></li>
                        </ul>
                    </header>
                    <Route exact path="/" component={Home} />
                    <Route path="/bar" component={Bar} />
                    <Route path="/foo" component={Foo} />
                </main>
            </Router>
        )
    }
}
