import * as setCenterTile from './setTile';
import * as setMetaData from './setMetaData';
import * as flickrRequest from './flickrRequest';

export default {
  ...setCenterTile,
  ...setMetaData,
  ...flickrRequest,
};
