import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducers'
import './main.css'
import App from './components'

const store = createStore(reducer)
const root = document.getElementById('root')
render(<App store={store} />, root)
