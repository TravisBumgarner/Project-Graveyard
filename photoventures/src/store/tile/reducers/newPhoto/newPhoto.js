const newPhoto = (state = [], action) => {
  switch (action.type) {
    case 'FLICKR_REQUEST_SUCCESS':
      return {
        [action.direction]: action.tileData,
      };
    default:
      return state;
  }
};

export default newPhoto;
