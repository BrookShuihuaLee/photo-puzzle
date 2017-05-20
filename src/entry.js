import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import reducers from './reducers'
import { App } from './components'

import './global/loadEnv'

render(
    <Provider store={createStore(reducers, applyMiddleware(thunk))}>
        <App />
    </Provider>,
    document.getElementById('mount')
)