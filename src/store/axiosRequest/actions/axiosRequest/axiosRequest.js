import axios from 'axios';

const axiosRequest = (method='get', url, data, responseType='stream') => {
  axios({
    method,
    url,
    data,
    responseType
  })
    .then(function(response) {
      console.log("response", response);
  });
};

export default axiosRequest;