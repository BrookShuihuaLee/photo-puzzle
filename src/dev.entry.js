import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import { App } from './components'
import reducers from './reducers'

import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor';
// import SliderMonitor from 'redux-slider-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

const DevTools = createDevTools(
    <DockMonitor
        defaultIsVisible={false}
        toggleVisibilityKey='ctrl-h'
        changePositionKey='ctrl-q'
        changeMonitorKey='ctrl-m'>
        <LogMonitor />
        {/*<SliderMonitor />*/}
    </DockMonitor>
)

render(
    <Provider store={createStore(reducers, DevTools.instrument())}>
        <div>
            <App />
            <DevTools />
        </div>
    </Provider>,
    document.getElementById('mount')
)