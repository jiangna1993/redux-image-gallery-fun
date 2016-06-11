export const IMAGE_SELECTED = 'IMAGE_SELECTED'
export const IMAGES_LOADED = 'IMAGES_LOADED'
export const IMAGE_LOAD_FAILURE = 'IMAGE_LOAD_FAILURE'
export const LOAD_IMAGES = 'LOAD_IMAGES'

export const imageSelected = (image) => ({ type: IMAGE_SELECTED, image: image })
export const imagesLoaded = (images) => ({ type: IMAGES_LOADED, images: images })
export const imageLoadFailure = (error) => ({ type: IMAGE_LOAD_FAILURE, error: error })
export const loadImages = () => ({ type: LOAD_IMAGES })
