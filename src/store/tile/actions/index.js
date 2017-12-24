import * as setCenterTile from './setCenterTile';
import * as setTile from './setTile';
import * as setMetaData from './setMetaData';
import * as flickrRequest from './flickrRequest';
import * as setRadialTile from './setRadialTile';
import * as googleMapsRequest from './googleMapsRequest';

export default {
  ...setCenterTile,
  ...setTile,
  ...setMetaData,
  ...flickrRequest,
  ...setRadialTile,
  ...googleMapsRequest,
};
