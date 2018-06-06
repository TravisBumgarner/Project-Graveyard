import * as getRequest from './getRequest';
import * as postRequest from './postRequest';
import * as putRequest from './putRequest';

export default {
  ...getRequest,
  ...postRequest,
  ...putRequest,
};
