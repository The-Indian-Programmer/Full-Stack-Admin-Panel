const initialState = null;
const user = (state = initialState, action) => {
  switch (action.type) {
    case "SETUSER":
      state = action.payload;
      return state;
      break;

    case "REMOVEUSER":
      state = null;
      return state;
      break;
    default:
      return state;
      break;
  }
};

export default user;
