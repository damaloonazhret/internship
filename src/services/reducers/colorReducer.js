export const colorReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRIMARY":
      return { ...state, primary: action.payload };
    case "SET_SECONDARY":
      return { ...state, secondary: action.payload };
    case "RESET_PRIMARY":
      return { ...state, primary: action.payload };
    case "RESET_SECONDARY":
      return { ...state, secondary: action.payload };
    default:
      return state;
  }
};
