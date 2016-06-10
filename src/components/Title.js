import React, { PropTypes } from 'react'

const Title = ({heading, image}) => (
  <div className='title'>
    <img src={image} className='egghead' />
    <h3>{heading}</h3>
  </div>
)

Title.propTypes = {
  image: PropTypes.string,
  heading: PropTypes.string
}

export default Title
