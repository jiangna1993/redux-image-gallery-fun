import React, { PropTypes } from 'react'
import Title from './Title'
import Gallery from './Gallery'
import { Provider } from 'react-redux'

const App = ({store}) => (
  <Provider store={store}>
    <div>
      <Title heading='Egghead Image Gallery' image='http://cloud.egghead.io/2G021h3t2K10/download/egghead-logo-head-only.svg' />
      <Gallery />
    </div>
  </Provider>
)

App.propTypes = {
  store: PropTypes.object.isRequired
}

export default App
