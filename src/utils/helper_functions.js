export function getSurroundingCoords(lat, long, distance){
  lat = Number(lat); long = Number(long); distance = Number(distance);
  return {
    "NW": {
      "LAT": lat - distance,
      "LONG": long + distance
    },
    "N": {
      "LAT": lat + distance,
      "LONG": long
    },
    "NE": {
      "LAT": lat + distance,
      "LONG": long + distance
    },
    "W": {
      "LAT": lat,
      "LONG": long - distance
    },
    "E": {
      "LAT": lat,
      "LONG": long + distance
    },
    "SW": {
      "LAT": lat - distance,
      "LONG": long - distance
    },
    "S": {
      "LAT": lat - distance,
      "LONG": long
    },
    "SE": {
      "LAT": lat - distance,
      "LONG": long + distance
    },
  }
}
// Todo factor in Google maps to this.