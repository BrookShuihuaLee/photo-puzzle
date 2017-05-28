import React, { Component } from 'react'
import Paper from 'material-ui/Paper'

const PAPER_STYLE = {
    width: '80%',
    margin: '80px auto',
    padding: 20,
    wordBreak: 'break-all'
}

export default class Bar extends Component {
    render() {
        return (
            <article>
                <Paper style={PAPER_STYLE} zDepth={3} >
                    <p>一个拼图游戏。可以上传图片。可以分享给别人。</p>
                    <div>作者：Brook</div>
                    <div>邮箱：759916638@qq.com</div>
                    <div>源代码：
                        <a href='https://github.com/BrookShuihuaLee/photo-puzzle'>
                            https://github.com/BrookShuihuaLee/photo-puzzle
                        </a>
                    </div>
                </Paper>
            </article>
        )
    }
}
