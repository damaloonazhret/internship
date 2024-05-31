import {Colors} from "../../components/App";

export type ColorsTypes = "SET_PRIMARY" | "SET_SECONDARY" | "RESET_PRIMARY" | "RESET_SECONDARY"

interface ColorAction {
  type: ColorsTypes,
  payload: string
}

export const colorReducer = (state: Colors, action: ColorAction): Colors => {
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
