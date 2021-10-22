const initialState = {};
const alert = (state = initialState, action) => {
  switch (action.type) {
    case "SETALERT":
      state = action.payload;
      return state;
      break;

    default:
      return state;
      break;
  }
};

export default alert;
