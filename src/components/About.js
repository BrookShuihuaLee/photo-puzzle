import React, { Component } from 'react'
import Paper from 'material-ui/Paper'

const style = {
    width: '80%',
    margin: '80px auto',
    padding: 20
}

export default class Bar extends Component {
    render() {
        return (
            <article>
                <Paper style={style} zDepth={3} >
                    <div>作者：Brook</div>
                    <div>邮箱：759916638@qq.com</div>
                </Paper>
            </article>
        )
    }
}
