import {Dispatch, SetStateAction, useCallback, useEffect, useReducer, useRef, useState} from "react";
import { fontReducer } from "../../../services/reducers/fontReducer";
import {colorReducer, ColorsTypes} from "../../../services/reducers/colorReducer";
import { Title } from "../../../components/common/InfoText/Title";
import { useLocalStorage } from "../../../services/hooks/useLocalStorage";
import { useThrottle } from "../../../services/hooks/useThrottle";
import {
  DEFAULT_COLOR_BLACK,
  DEFAULT_COLOR_WHITE,
} from "../../../components/constants/constants";
import { ColorsPage, FontsPage } from "../index";
import {Colors, Themes} from "../../../components/App";
import {ComputedMatch} from "../../Validate/Validate";
import {RefObjectWithValue} from "../../../components/common/Input/Input";

interface ComputedStyleProps {
  colors: Colors;
  theme: Themes;
  setColors: (
    colors: (prevColors: Colors) => { secondary: string; primary: string },
  ) => void;
  computedMatch: ComputedMatch;
}

type ColorKeyType = "primary" | "secondary";

export const ComputedStyle = ({ computedMatch, theme, setColors, colors }: ComputedStyleProps) => {
  const { settingsId } = computedMatch.params;
  const { getItem, setItem, removeItem } = useLocalStorage();
  const primaryColorRef = useRef<RefObjectWithValue>(null);
  const secondaryColorRef = useRef<RefObjectWithValue>(null);

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

  const [primary, setPrimary] = useState<string>('');
  const [secondary, setSecondary] = useState<string>('');
  const throttlePrimaryColor = useThrottle(primary || colorState.primary);
  const throttleSecondaryColor = useThrottle(secondary || colorState.secondary);

  const setColor = useCallback(
      (colorKey: ColorKeyType, throttledColor: string) => {
        let type: ColorsTypes;
        switch (colorKey) {
          case "primary":
            type = "SET_PRIMARY";
            break;
          case "secondary":
            type = "SET_SECONDARY";
            break;
          default:
            throw new Error(`Invalid colorKey: ${colorKey}`);
        }

        dispatchColor({
          type,
          payload: throttledColor,
        });
        setItem(colorKey, throttledColor);
      },
      [setItem],
  );


  useEffect(() => {
    setColors((prevColors: Colors) => ({ ...prevColors, ...colorState }));
  }, [colorState, setColors]);

  useEffect(() => {
    setColor("primary", throttlePrimaryColor);
  }, [throttlePrimaryColor, setColor]);

  useEffect(() => {
    setColor("secondary", throttleSecondaryColor);
  }, [throttleSecondaryColor, setColor]);

  const changeColor = (colorKey: string, setColorFn: Dispatch<SetStateAction<string>>) => () => {
    const currentRef = colorKey === 'primary' ? primaryColorRef : secondaryColorRef;
    if (currentRef && currentRef.current) {
      const newColor = currentRef.current.getValue();
      setColorFn(newColor);
    }
  };

  const resetColor = (colorKey: keyof Colors, defaultColor: string) => () => {
    let type: ColorsTypes;
    switch (colorKey) {
      case "primary":
        type = "RESET_PRIMARY";
        break;
      case "secondary":
        type = "RESET_SECONDARY";
        break;
      default:
        throw new Error(`Invalid colorKey: ${colorKey}`);
    }

    dispatchColor({
      type,
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
        <ColorsPage
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
        <FontsPage
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
