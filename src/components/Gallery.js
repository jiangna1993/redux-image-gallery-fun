import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { imageSelected } from '../actions'
import { bindActionCreators } from 'redux'

export class Gallery extends Component {
  constructor (props) {
    super(props)
    this.renderImages = this.renderImages.bind(this)
  }

  renderImages (image, index) {
    const {imageSelected} = this.props
    const thumbClickHandler = () => imageSelected(image)
    return (
    <div key={index}>
      <img src={image} onClick={thumbClickHandler} />
    </div>)
  }

  render () {
    const {images, selectedImage} = this.props
    return (
    <div className='image-gallery'>
      <div className='gallery-image'>
        <div>
          <img src={selectedImage} />
        </div>
      </div>
      <div className='image-scroller'>
        {images.map(this.renderImages)}
      </div>
    </div>)
  }
}

const mapStateToProps = (state) => ({
  images: state.images,
  selectedImage: state.selectedImage
})

const mapDispatchToProps = (dispatch) => (bindActionCreators({imageSelected}, dispatch))

export default connect(mapStateToProps, mapDispatchToProps)(Gallery)
