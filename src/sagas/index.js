import { call, put, take, fork } from 'redux-saga/effects'
import { imagesLoaded, imageSelected, imageLoadFailure, LOAD_IMAGES } from '../actions'
import fetch from 'isomorphic-fetch'

const API_KEY = 'a46a979f39c49975dbdd23b378e6d3d5'
const API_ENDPOINT = `https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=${API_KEY}&format=json&nojsoncallback=1&per_page=5`

export const fetchImages = () => {
  return fetch(API_ENDPOINT).then(function (response) {
    return response.json().then(function (json) {
      return json.photos.photo.map(
        ({farm, server, id, secret}) => `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`
      )
    })
  })
}

// this is a worker saga
export function * loadImages () {
  try {
    const images = yield call(fetchImages)
    yield put(imagesLoaded(images))
    yield put(imageSelected(images[0]))
  } catch (error) {
    yield put(imageLoadFailure(error))
  }
}

// this is a daemon
export default function * watchForLoadImages () {
  while (true) {
    yield take(LOAD_IMAGES)
    yield fork(loadImages)
  }
}
