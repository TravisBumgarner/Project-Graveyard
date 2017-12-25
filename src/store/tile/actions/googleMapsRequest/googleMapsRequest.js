import axios from 'axios';
import { setCenterTile } from '../setCenterTile/setCenterTile';

export const googleMapsRequest = address => (dispatch) => {
  const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
  const params = {
    address,
    api_key: 'AIzaSyDzL_3GJe5qmcpTQwBQ46wCITJyf7nZPbA',
  };
  return axios.get(baseUrl, { params }).then((response) => {
    const {lat, lng} = response.data.results[0].geometry.location; //eslint-disable-line
    dispatch(setCenterTile({ centerLat: lat, centerLon: lng }, 0.001));
  });
};

export default {
  googleMapsRequest,
};
