import axios from 'axios';

export const flickrRequest = (direction, lat, lon) => {
  return (dispatch) => {
    const baseUrl = 'https://api.flickr.com/services/rest';
    const params = {
      lat,
      lon,
      api_key: "0ebb6cf43cd6ccab59f2ffaf1b63f0c5",
      format: "json",
      nojsoncallback: 1,
      method: "flickr.photos.search",
    };
    return axios.get(baseUrl, {params}).then(response => {
      const photos = response.data.photos.photo;
      if (photos && photos.length) {
        const idx = Math.floor(Math.random() * photos.length); // Grab random image index to display
        const photo = photos[idx];
        return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_q.jpg`;
      }
    })
  };
};


