import { ThemeColors } from "../../components/App";
import {ColorsActionTypes} from "../../components/common/Enums";

export type ColorsTypes =
  | ColorsActionTypes.SET_PRIMARY
  | ColorsActionTypes.SET_SECONDARY
  | ColorsActionTypes.RESET_PRIMARY
  | ColorsActionTypes.RESET_SECONDARY;

interface ColorAction {
  type: ColorsTypes;
  payload: string;
}

export const colorReducer = (
  state: ThemeColors,
  action: ColorAction,
): ThemeColors => {
  switch (action.type) {
    case ColorsActionTypes.SET_PRIMARY:
      return { ...state, primary: action.payload };
    case ColorsActionTypes.SET_SECONDARY:
      return { ...state, secondary: action.payload };
    case ColorsActionTypes.RESET_PRIMARY:
      return { ...state, primary: action.payload };
    case ColorsActionTypes.RESET_SECONDARY:
      return { ...state, secondary: action.payload };
    default:
      return state;
  }
};
