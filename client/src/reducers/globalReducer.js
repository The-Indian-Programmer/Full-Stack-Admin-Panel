const initialState = false;
const loader = (state = initialState, action) => {
  switch (action.type) {
    case "SHOWLOADER":
      state = true;
      return state;
      break;

    case "REMOVELOADER":
      state = false;
      return state;
      break;
    default:
      return state;
      break;
  }
};

export default loader;
