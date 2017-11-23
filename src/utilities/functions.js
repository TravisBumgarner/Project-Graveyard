import axios from 'axios';

export function getTileCoords(direction, lat, lon, rad){
  let coords;
  switch(direction) {
    case 'C':  coords = { 'lat': lat,       'lon': lon};        break;
    case 'NW': coords = { 'lat': lat - rad, 'lon': lon + rad }; break;
    case 'N':  coords = { 'lat': lat + rad, 'lon': lon };       break;
    case 'NE': coords = { 'lat': lat + rad, 'lon': lon + rad }; break;
    case 'W':  coords = { 'lat': lat,       'lon': lon - rad }; break;
    case 'E':  coords = { 'lat': lat,       'lon': lon + rad }; break;
    case 'SW': coords = { 'lat': lat - rad, 'lon': lon - rad }; break;
    case 'S':  coords = { 'lat': lat - rad, 'lon': lon };       break;
    case 'SE': coords = { 'lat': lat - rad, 'lon': lon + rad }; break;
  }
  return coords;
}

export function getPhoto(lat, lon){
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
    if (photos && photos.length){
      const idx = Math.floor(Math.random() * photos.length); // Grab random image index to display
      const photo = photos[idx];
      src = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
      console.log(src);
      return src;
    }
  });


}