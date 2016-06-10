import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import './main.css'
import App from './components'

const root = document.getElementById('root')
render(<App />, root)
