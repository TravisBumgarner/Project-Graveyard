export function getSurroundingCoords(lat, lon, distance){
  lat = Number(lat); lon = Number(lon); distance = Number(distance);
  return {
    "NW": {
      "LAT": lat - distance,
      "LON": lon + distance
    },
    "N": {
      "LAT": lat + distance,
      "LON": lon
    },
    "NE": {
      "LAT": lat + distance,
      "LON": lon + distance
    },
    "W": {
      "LAT": lat,
      "LON": lon - distance
    },
    "E": {
      "LAT": lat,
      "LON": lon + distance
    },
    "SW": {
      "LAT": lat - distance,
      "LON": lon - distance
    },
    "S": {
      "LAT": lat - distance,
      "LON": lon
    },
    "SE": {
      "LAT": lat - distance,
      "LON": lon + distance
    },
  }
}
// Todo factor in Google maps to this.