import test from 'tape'
import { put, take, fork, call } from 'redux-saga/effects'
import { fetchImages, default as watchForLoadImages, loadImages } from './sagas'
import { LOAD_IMAGES, imagesLoaded, imageSelected, imageLoadFailure } from './actions'

test('watchForLoadImages', function (assert) {
  const generator = watchForLoadImages()
  assert.deepEqual(generator.next().value, take(LOAD_IMAGES), 'watch for load images should be waiting for LOAD_IMAGES action')
  assert.deepEqual(generator.next().value, fork(loadImages), 'watch images should start the loadImages worker saga')

  assert.end()
})

test('loadImages', function (assert) {
  const unit = loadImages()
  let expected, actual, message
  expected = call(fetchImages)
  actual = unit.next().value
  message = 'loadImages should call fetchImages from flickr'
  assert.deepEqual(actual, expected, message)

  const images = [0]
  expected = put(imagesLoaded(images))
  actual = unit.next(images).value
  message = 'loadImages should dispatch an IMAGES_LOADED action'
  assert.deepEqual(actual, expected, message)

  expected = put(imageSelected(images[0]))
  actual = unit.next().value
  message = 'loadImages should dispatch an IMAGE_SELECTED action'
  assert.deepEqual(actual, expected, message)

  const error = 'error'
  expected = put(imageLoadFailure(error))
  actual = unit.throw(error).value
  message = 'loadImages should dispatch an IMAGE_LOAD_FAILURE action'
  assert.deepEqual(actual, expected, message)

  assert.end()
})
