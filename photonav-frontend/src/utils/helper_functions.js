export function getCoordsData(lat=null, lon=null, rad=null){
  return {
    "C": {
      "lat": lat,
      "lon": lon
    },
    "NW": {
      "lat": lat - rad,
      "lon": lon + rad
    },
    "N": {
      "lat": lat + rad,
      "lon": lon
    },
    "NE": {
      "lat": lat + rad,
      "lon": lon + rad
    },
    "W": {
      "lat": lat,
      "lon": lon - rad
    },
    "E": {
      "lat": lat,
      "lon": lon + rad
    },
    "SW": {
      "lat": lat - rad,
      "lon": lon - rad
    },
    "S": {
      "lat": lat - rad,
      "lon": lon
    },
    "SE": {
      "lat": lat - rad,
      "lon": lon + rad
    },
  }
}
// Todo factor in Google maps to this.