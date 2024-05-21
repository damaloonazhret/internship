import { Fonts } from "./Fonts/Fonts";
import { Colors } from "./Colors/Colors";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { fontReducer } from "../../../services/reducers/fontReducer";
import { colorReducer } from "../../../services/reducers/colorReducer";
import { Title } from "../../../components/common/InfoText/Title";
import { useLocalStorage } from "../../../services/hooks/useLocalStorage";
import { useThrottle } from "../../../services/hooks/useThrottle";
import {
  DEFAULT_COLOR_BLACK,
  DEFAULT_COLOR_WHITE,
} from "../../../components/constants/constants";

export const ComputedStyle = ({ computedMatch, theme, setColors, colors }) => {
  const { settingsId } = computedMatch.params;
  const { getItem, setItem, removeItem } = useLocalStorage();
  const primaryColorRef = useRef(null);
  const secondaryColorRef = useRef(null);

  const initialFontState = { fontSize: Number(getItem("FS")) || 16 };
  const initialColorState = {
    primary: colors.primary,
    secondary: colors.secondary,
  };

  const [fontState, dispatchFont] = useReducer(fontReducer, initialFontState);
  const [colorState, dispatchColor] = useReducer(
    colorReducer,
    initialColorState,
  );

  const [primary, setPrimary] = useState();
  const [secondary, setSecondary] = useState();
  const throttlePrimaryColor = useThrottle(primary || colorState.primary);
  const throttleSecondaryColor = useThrottle(secondary || colorState.secondary);

  const setColor = useCallback(
    (colorKey, throttledColor) => {
      dispatchColor({
        type: `SET_${colorKey.toUpperCase()}`,
        payload: throttledColor,
      });
      setItem(colorKey, throttledColor);
    },
    [setItem],
  );

  useEffect(() => {
    setColors((prevColors) => ({ ...prevColors, ...colorState }));
  }, [colorState, setColors]);

  useEffect(() => {
    setColor("primary", throttlePrimaryColor);
  }, [throttlePrimaryColor, setColor]);

  useEffect(() => {
    setColor("secondary", throttleSecondaryColor);
  }, [throttleSecondaryColor, setColor]);

  const changeColor = (colorKey, setColorFn) => () => {
    const newColor = (
      colorKey === "primary" ? primaryColorRef : secondaryColorRef
    ).current.getValue();
    setColorFn(newColor);
  };

  const resetColor = (colorKey, defaultColor) => () => {
    dispatchColor({
      type: `RESET_${colorKey.toUpperCase()}`,
      payload: defaultColor,
    });
    removeItem(colorKey);
  };

  const increment = useCallback(
    () => dispatchFont({ type: "INCREMENT", payload: 0.5 }),
    [],
  );
  const decrement = useCallback(
    () => dispatchFont({ type: "DECREMENT", payload: 0.5 }),
    [],
  );
  const resetFont = useCallback(
    () => dispatchFont({ type: "RESET", payload: 16 }),
    [],
  );

  return (
    <div className="settings">
      <Title
        title={`${settingsId.charAt(0).toUpperCase() + settingsId.slice(1)} style settings`}
      />
      {settingsId === "colors" ? (
        <Colors
          primaryColorRef={primaryColorRef}
          secondaryColorRef={secondaryColorRef}
          changePrimaryColor={changeColor("primary", setPrimary)}
          changeSecondaryColor={changeColor("secondary", setSecondary)}
          resetPrimaryColor={resetColor("primary", DEFAULT_COLOR_BLACK)}
          resetSecondaryColor={resetColor("secondary", DEFAULT_COLOR_WHITE)}
          theme={theme}
          colors={colorState}
        />
      ) : (
        <Fonts
          increment={increment}
          decrement={decrement}
          reset={resetFont}
          count={fontState}
          FS={initialFontState.fontSize}
        />
      )}
    </div>
  );
};
