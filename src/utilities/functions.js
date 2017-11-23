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