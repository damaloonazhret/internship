import { FontsActionTypes } from "../../components/common/Enums";

interface FontState {
  fontSize: number;
}

interface FontAction {
  type:
    | FontsActionTypes.INCREMENT
    | FontsActionTypes.DECREMENT
    | FontsActionTypes.RESET;
  payload: number;
}

export const fontReducer = (
  state: FontState,
  action: FontAction,
): FontState => {
  switch (action.type) {
    case FontsActionTypes.INCREMENT: {
      const fontSize = state.fontSize + action.payload;
      document.documentElement.style.fontSize = `${fontSize}px`;
      localStorage.setItem("FS", String(fontSize));
      return { ...state, fontSize: state.fontSize + action.payload };
    }
    case FontsActionTypes.DECREMENT: {
      const fontSize = state.fontSize - action.payload;
      document.documentElement.style.fontSize = `${fontSize}px`;
      localStorage.setItem("FS", String(fontSize));
      return { ...state, fontSize: state.fontSize - action.payload };
    }
    case FontsActionTypes.RESET:
      document.documentElement.style.fontSize = `${action.payload}px`;
      localStorage.setItem("FS", String(action.payload));
      return { ...state, fontSize: action.payload };
    default:
      return state;
  }
};
