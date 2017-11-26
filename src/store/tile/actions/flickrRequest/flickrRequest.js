import axios from 'axios';

export const FLICKR_REQUEST_START = 'FLICKR_REQUEST_START';
export const FLICKR_REQUEST_SUCCESS = 'FLICKR_REQUEST_SUCCESS';
export const FLICKR_REQUEST_FAILURE = 'FLICKR_REQUEST_FAILURE';

export const flickrRequestStart = (direction) => ({
  type: FLICKR_REQUEST_START,
  direction,
  tileData: {isLoading: true},
});

export const flickrRequestSuccess = (direction, lat, lon, src) => ({
  type: FLICKR_REQUEST_SUCCESS,
  direction,
  tileDetails: {lat, lon, src, isLoading: false},
});

export const flickrRequestFailure = (direction, error) => ({
  type: FLICKR_REQUEST_FAILURE,
  error,
  direction,
  tileDetails: {isLoading: false},
});

export const flickrRequest = (direction, lat, lon) => (dispatch) => {
  dispatch(flickrRequestStart(direction));

  const baseUrl = 'https://api.flickr.com/services/rest';
  const params = {
    lat,
    lon,
    api_key: "0ebb6cf43cd6ccab59f2ffaf1b63f0c5",
    format: "json",
    nojsoncallback: 1,
    method: "flickr.photos.search",
  };

  let src;
  axios.get(baseUrl, {params}).then(response => {
    const photos = response.data.photos.photo;
    if (photos && photos.length) {
      const idx = Math.floor(Math.random() * photos.length); // Grab random image index to display
      const photo = photos[idx];
      src = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_q.jpg`;
      dispatch(flickrRequestSuccess(direction, lat, lon, src));
    }
  }).catch( (error)=> {
    dispatch(flickrRequestFailure(direction, error));
  });
};