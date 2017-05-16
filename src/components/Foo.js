import React, { Component } from 'react'
import { BosClient } from 'bce-sdk-js/baidubce-sdk.bundle.min.js'

export default class Foo extends Component {
    render() {
        return <div>I am Foo!
            <button onClick={() => this.haha()}>asdf</button>
        </div>
    }

    haha() {
        new BosClient({
            endpoint: 'http://photo-puzzle.gz.bcebos.com',
            credentials: {
                ak: '800326b3ef7b41cda0a2943d4c49abed',
                sk: 'fb258923552c4be291ef8d24467fc162'
            }
        }).putObjectFromString('images', 'hello.js' + (this.k = ~~(this.k) + 1), 'hello world')
        .then(response => console.log(response))
        .catch(error => console.error(error))
    }
}
