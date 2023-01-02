export function getTileCoords(direction, lat, lon, rad) {
  let coords;
  const diagRad = rad / (2 ** 0.5);
  switch (direction) {
    case 'C': coords = { lat, lon }; break;
    case 'NW': coords = { lat: lat + diagRad, lon: lon - diagRad }; break;
    case 'N': coords = { lat: lat + rad, lon }; break;
    case 'NE': coords = { lat: lat + diagRad, lon: lon + diagRad }; break;
    case 'W': coords = { lat, lon: lon - rad }; break;
    case 'E': coords = { lat, lon: lon + rad }; break;
    case 'SW': coords = { lat: lat - diagRad, lon: lon - diagRad }; break;
    case 'S': coords = { lat: lat - rad, lon }; break;
    case 'SE': coords = { lat: lat - diagRad, lon: lon + diagRad }; break;
    default:
      coords = { lat, lon };
  }
  return coords;
}

export default {
  getTileCoords,
};
