import * as setCenterTile from './setCenterTile';
import * as setTile from './setTile';
import * as setMetaData from './setMetaData';
import * as flickrRequest from './flickrRequest';

export default {
  ...setCenterTile,
  ...setTile,
  ...setMetaData,
  ...flickrRequest,
};
