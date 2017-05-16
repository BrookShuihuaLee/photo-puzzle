import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import reducers from './reducers'
import { App } from './components'

render(
    <Provider store={createStore(reducers)}>
        <App />
    </Provider>,
    document.getElementById('mount')
)