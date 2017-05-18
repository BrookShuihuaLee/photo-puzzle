import React, { Component } from 'react'

export default class Foo extends Component {
    render() {
        return <div>I am Foo!
            <button onClick={() => this.haha()}>asdf</button>
        </div>
    }

    haha() {
        
    }
}
