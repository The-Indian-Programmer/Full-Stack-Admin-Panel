export const setUser = (data) => {
  return {
    type: "SETUSER",
    payload: data,
  };
};
export const removeUser = () => {
  return {
    type: "REMOVEUSER",
  };
};

export const showLoader = () => {
  return {
    type: "SHOWLOADER",
  };
};

export const removeLoader = () => {
  return {
    type: "REMOVELOADER",
  };
};

export const setAlert = (data) => {
  return {
    type: "SETALERT",
    payload: data,
  };
};
