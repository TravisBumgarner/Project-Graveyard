const defaultData = {
  radius: 0.001, // meters
};

const meta = (state = defaultData, action) => {
  switch (action.type) {
    case 'SET_META_DATA_SUCCESS':
      return {
        ...defaultData,
        radius: action.radius,
      };
    default:
      return state;
  }
};

export default meta;
