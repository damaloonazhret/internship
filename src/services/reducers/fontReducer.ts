interface FontState {
  fontSize: number;
}

interface FontAction {
  type: "INCREMENT" | "DECREMENT" | "RESET",
  payload: number
}

export const fontReducer = (state: FontState, action: FontAction): FontState => {
  switch (action.type) {
    case "INCREMENT": {
      const fontSize = state.fontSize + action.payload;
      document.documentElement.style.fontSize = `${fontSize}px`;
      localStorage.setItem("FS", String(fontSize));
      return { ...state, fontSize: state.fontSize + action.payload };
    }
    case "DECREMENT": {
      const fontSize = state.fontSize - action.payload;
      document.documentElement.style.fontSize = `${fontSize}px`;
      localStorage.setItem("FS", String(fontSize));
      return { ...state, fontSize: state.fontSize - action.payload };
    }
    case "RESET":
      document.documentElement.style.fontSize = `${action.payload}px`;
      localStorage.setItem("FS", String(action.payload));
      return { ...state, fontSize: action.payload };
    default:
      return state;
  }
};
