import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import './main.css'

const HelloWorld = () => (<h1>Hello World</h1>)
const root = document.getElementById('root')
render(<HelloWorld />, root)
