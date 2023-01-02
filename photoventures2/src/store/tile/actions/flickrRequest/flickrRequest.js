import axios from 'axios';

export const flickrRequest = (lat, lon) => () => {
  const baseUrl = 'https://api.flickr.com/services/rest';
  // https://www.flickr.com/services/api/flickr.photos.search.html
  const params = {
    lat,
    lon,
    api_key: '0ebb6cf43cd6ccab59f2ffaf1b63f0c5',
    format: 'json',
    nojsoncallback: 1,
    method: 'flickr.photos.search',
    sort: 'interestingness-desc',
    accuracy: 16,
    safe_search: 3,
    content_type: 1,
    radius: 0.5,
  };
  return axios.get(baseUrl, { params }).then((response) => {
    const photos = response.data.photos.photo;
    let result;
    if (photos && photos.length) {
      const idx = Math.floor(Math.random() * photos.length); // Grab random image index to display
      const photo = photos[idx];
      result = {
        src: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_q.jpg`,
        flickrPage: `https://www.flickr.com/photos/${photo.owner}/${photo.id}`,
      };
    } else {
      result = false;
    }
    return result;
  });
};

export default {
  flickrRequest,
};
