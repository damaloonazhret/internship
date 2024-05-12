import { SetThemeColor } from "./SetThemeColor";
import { SetFS } from "./SetFS";
import { useCallback, useReducer, useRef } from "react";
import {DEFAULT_COLOR_BLACK, DEFAULT_COLOR_WHITE} from "../../../components/common/constants/constants";
import {fontReducer} from "../../../services/reducers/fontReducer";

export const ComputedStyle = (props) => {
  const { settingsId } = props.computedMatch.params;
  const FS = Number(localStorage.getItem("FS"));
  const initialState = {
    fontSize: FS ? FS : 16,
  };
  const primaryColorRef = useRef(null);
  const secondaryColorRef = useRef(null);
  const [count, dispatch] = useReducer(fontReducer, initialState, undefined);

  const increment = useCallback(() => {
    dispatch({ type: "INCREMENT", payload: 0.5 });
  }, []);

  const decrement = useCallback(() => {
    dispatch({ type: "DECREMENT", payload: 0.5 });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: "RESET", payload: 16 });
  }, []);

  const changePrimaryColor = () => {
    const newPrimaryColor = primaryColorRef.current.value;
    props.setColors({
      ...props.colors,
      primary: newPrimaryColor,
    });
    localStorage.setItem("primary", newPrimaryColor);
  };

  const changeSecondaryColor = () => {
    const newSecondaryColor = secondaryColorRef.current.value;
    props.setColors({
      ...props.colors,
      secondary: newSecondaryColor,
    });
    localStorage.setItem("secondary", newSecondaryColor);
  };

  const resetPrimaryColor = () => {
    props.setColors({
      ...props.colors,
      primary: DEFAULT_COLOR_BLACK,
    });
    localStorage.removeItem("primary");
  };

  const resetSecondaryColor = () => {
    props.setColors({
      ...props.colors,
      secondary: DEFAULT_COLOR_WHITE,
    });
    localStorage.removeItem("secondary");
  };

  return (
    <div className="settings">
      {settingsId.charAt(0).toUpperCase() + settingsId.slice(1)} style settings
      {settingsId === "colors" ? (
        <SetThemeColor
          primaryColorRef={primaryColorRef}
          secondaryColorRef={secondaryColorRef}
          changePrimaryColor={changePrimaryColor}
          changeSecondaryColor={changeSecondaryColor}
          resetPrimaryColor={resetPrimaryColor}
          resetSecondaryColor={resetSecondaryColor}
          theme={props.theme}
          colors={props.colors}
        />
      ) : (
        <SetFS
          increment={increment}
          decrement={decrement}
          reset={reset}
          count={count}
          FS={FS}
        />
      )}
    </div>
  );
};
