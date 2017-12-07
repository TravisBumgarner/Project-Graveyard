import axios from 'axios';

export const flickrRequest = (lat, lon) => (dispatch) => {
  const baseUrl = 'https://api.flickr.com/services/rest';
  const params = {
    lat,
    lon,
    api_key: '0ebb6cf43cd6ccab59f2ffaf1b63f0c5',
    format: 'json',
    nojsoncallback: 1,
    method: 'flickr.photos.search',
  };
  return axios.get(baseUrl, { params }).then((response) => {
    const photos = response.data.photos.photo;
    let src;
    if (photos && photos.length) {
      const idx = Math.floor(Math.random() * photos.length); // Grab random image index to display
      const photo = photos[idx];
      src = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_q.jpg`;
    } else {
      src = false;
    }
    return src;
  });
};

