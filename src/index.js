import React from 'react'
import { render } from 'react-dom'

const HelloWorld = () => (<h1>Hello World</h1>)
const root = document.getElementById('root')
render(<HelloWorld/>, root)
