import React, { Component } from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import _ from 'lodash'

const PAPER_STYLE = {
    width: '80%',
    margin: '80px auto',
    padding: 20,
    wordBreak: 'break-all'
}

class About extends Component {
    render() {
        let {
            languages: {
                ABOUT_TITLE,
                AUTHOR,
                EMAIL,
                SOURCE_CODE
            }
        } = this.props

        return (
            <article>
                <Paper style={PAPER_STYLE} zDepth={3} >
                    <p>{ABOUT_TITLE}</p>
                    <div>{AUTHOR}：Brook</div>
                    <div>{EMAIL}：759916638@qq.com</div>
                    <div>{SOURCE_CODE}：
                        <a href='https://github.com/BrookShuihuaLee/photo-puzzle'>
                            https://github.com/BrookShuihuaLee/photo-puzzle
                        </a>
                    </div>
                </Paper>
            </article>
        )
    }
}

export default connect(
    state => _.pick(state, ['languages'])
)(About)