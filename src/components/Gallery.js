import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'

const flickrImages = [
  'https://farm2.staticflickr.com/1553/25266806624_fdd55cecbc.jpg',
  'https://farm2.staticflickr.com/1581/25283151224_50f8da511e.jpg',
  'https://farm2.staticflickr.com/1653/25265109363_f204ea7b54.jpg',
  'https://farm2.staticflickr.com/1571/25911417225_a74c8041b0.jpg',
  'https://farm2.staticflickr.com/1450/25888412766_44745cbca3.jpg'
]

export default class Gallery extends Component {
  constructor (props) {
    super(props)
    this.state = {
      images: flickrImages,
      selectedImage: flickrImages[0]
    }
    this.handleThumbClick = this.handleThumbClick.bind(this)
    this.renderImages = this.renderImages.bind(this)
  }

  handleThumbClick (selectedImage) {
    this.setState({selectedImage})
  }

  componentDidMount () {
    const API_KEY = 'a46a979f39c49975dbdd23b378e6d3d5'
    const API_ENDPOINT = `https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=${API_KEY}&format=json&nojsoncallback=1&per_page=5`

    fetch(API_ENDPOINT).then((response) => {
      return response.json().then((json) => {
        const images = json.photos.photo.map(({farm, server, id, secret}) => {
          return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`
        })

        this.setState({images, selectedImage: images[0]})
      })
    })
  }

  renderImages (image, index) {
    const thumbClickHandler = () => {
      this.handleThumbClick(image)
    }
    return (
    <div key={index}>
      <img src={image} onClick={thumbClickHandler} />
    </div>)
  }

  render () {
    const {images, selectedImage} = this.state
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
