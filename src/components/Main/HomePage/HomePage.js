import "./index.css";
import { memo, useReducer, useRef } from "react";
import { SettingsFont } from "./SettingsFont/SettingsFont";
import { SettingsTxt } from "./SettingsTxt/SettingsTxt";
import { SettingsBg } from "./SettingsBg/SettingsBg";
import {fontReducer} from "../../../services/Reducers/fontReducer";

const HomePage = (props) => {
  const primaryColorRef = useRef(null);
  const secondaryColorRef = useRef(null);

  const DEFAULT_COLOR_WHITE = "#ffffff";
  const DEFAULT_COLOR_BLACK = "#1a1a1a";
  const FS = Number(localStorage.getItem("FS"));

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

  const initialState = {
    fontSize: FS ? FS : 16,
  };

  const [count, dispatch] = useReducer(fontReducer, initialState, undefined);

  const increment = () => {
    dispatch({ type: "INCREMENT", payload: 0.5 });
  };

  const decrement = () => {
    dispatch({ type: "DECREMENT", payload: 0.5 });
  };

  const reset = () => {
    dispatch({ type: "RESET", payload: 16 });
  };

  return (
    <article className="settings">
      <h2 className="settings__title">Settings Page</h2>
      <SettingsBg
        primaryColorRef={primaryColorRef}
        secondaryColorRef={secondaryColorRef}
        changePrimaryColor={changePrimaryColor}
        changeSecondaryColor={changeSecondaryColor}
        resetPrimaryColor={resetPrimaryColor}
        resetSecondaryColor={resetSecondaryColor}
        theme={props.theme}
        colors={props.colors}
      />
      <SettingsTxt
        primaryColorRef={primaryColorRef}
        secondaryColorRef={secondaryColorRef}
        changePrimaryColor={changePrimaryColor}
        changeSecondaryColor={changeSecondaryColor}
        resetPrimaryColor={resetPrimaryColor}
        resetSecondaryColor={resetSecondaryColor}
        theme={props.theme}
        colors={props.colors}
      />
      <SettingsFont
        increment={increment}
        decrement={decrement}
        reset={reset}
        count={count}
        FS={FS}
      />
    </article>
  );
};

export default memo(HomePage);
