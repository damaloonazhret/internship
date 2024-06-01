import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { fontReducer } from "../../../services/reducers/fontReducer";
import {
  colorReducer,
  ColorsTypes,
} from "../../../services/reducers/colorReducer";
import { Title } from "../../../components/common/InfoText/Title";
import { useLocalStorage } from "../../../services/hooks/useLocalStorage";
import { useThrottle } from "../../../services/hooks/useThrottle";
import {
  DEFAULT_COLOR_BLACK,
  DEFAULT_COLOR_WHITE,
} from "../../../components/constants/constants";
import { ColorsPage, FontsPage } from "../index";
import {
  ColorsState,
  SetColorsState,
  ThemeState,
} from "../../../components/App";
import { RefObjectWithValue } from "../../../components/common/Input/Input";
import { useParams } from "react-router-dom";
import {
  ColorsActionTypes,
  ColorsKey,
  FontsActionTypes,
} from "../../../components/common/Enums";

interface ComputedStyleProps {
  colors: ColorsState;
  theme: ThemeState;
  setColors: SetColorsState;
}

type ColorKeyType = ColorsKey.PRIMARY | ColorsKey.SECONDARY;

type ActionType = "SET" | "RESET";

export type ChangeColorFunction = (
  colorKey: ColorKeyType,
  setColorFn: Dispatch<SetStateAction<string>>,
) => () => void;

export const ComputedStyle: FC<ComputedStyleProps> = ({
  theme,
  setColors,
  colors,
}) => {
  const { settingsId } = useParams();
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

  const [primary, setPrimary] = useState<string>("");
  const [secondary, setSecondary] = useState<string>("");
  const throttlePrimaryColor = useThrottle(primary || colorState.primary);
  const throttleSecondaryColor = useThrottle(secondary || colorState.secondary);

  const getActionType = (
    colorKey: ColorKeyType,
    action: ActionType,
  ): ColorsTypes => {
    switch (colorKey) {
      case ColorsKey.PRIMARY:
        return action === ColorsActionTypes.SET
          ? ColorsActionTypes.SET_PRIMARY
          : ColorsActionTypes.RESET_PRIMARY;
      case ColorsKey.SECONDARY:
        return action === ColorsActionTypes.SET
          ? ColorsActionTypes.SET_SECONDARY
          : ColorsActionTypes.RESET_SECONDARY;
      default:
        throw new Error(`Invalid colorKey: ${colorKey}`);
    }
  };

  const setColor = useCallback(
    (colorKey: ColorKeyType, throttledColor: string) => {
      const type = getActionType(colorKey, ColorsActionTypes.SET);

      dispatchColor({
        type,
        payload: throttledColor,
      });

      setItem(colorKey, throttledColor);
    },
    [setItem],
  );

  const resetColor =
    (colorKey: keyof ColorsState, defaultColor: string) => () => {
      const type = getActionType(
        colorKey as ColorKeyType,
        ColorsActionTypes.RESET,
      );

      dispatchColor({
        type,
        payload: defaultColor,
      });

      removeItem(colorKey);
    };

  useEffect(() => {
    setColors((prevColors: ColorsState) => ({ ...prevColors, ...colorState }));
  }, [colorState, setColors]);

  useEffect(() => {
    setColor(ColorsKey.PRIMARY, throttlePrimaryColor);
  }, [throttlePrimaryColor, setColor]);

  useEffect(() => {
    setColor(ColorsKey.SECONDARY, throttleSecondaryColor);
  }, [throttleSecondaryColor, setColor]);

  const changeColor: ChangeColorFunction = (colorKey, setColorFn) => () => {
    const currentRef =
      colorKey === ColorsKey.PRIMARY ? primaryColorRef : secondaryColorRef;
    if (currentRef && currentRef.current) {
      const newColor = currentRef.current.getValue();
      setColorFn(newColor);
    }
  };

  const increment = useCallback(
    () => dispatchFont({ type: FontsActionTypes.INCREMENT, payload: 0.5 }),
    [],
  );
  const decrement = useCallback(
    () => dispatchFont({ type: FontsActionTypes.DECREMENT, payload: 0.5 }),
    [],
  );
  const resetFont = useCallback(
    () => dispatchFont({ type: FontsActionTypes.RESET, payload: 16 }),
    [],
  );

  return (
    <div className="settings">
      <Title
        title={
          settingsId
            ? `${settingsId.charAt(0).toUpperCase() + settingsId.slice(1)} style settings`
            : ""
        }
      />
      {settingsId === "colors" ? (
        <ColorsPage
          primaryColorRef={primaryColorRef}
          secondaryColorRef={secondaryColorRef}
          changePrimaryColor={changeColor(ColorsKey.PRIMARY, setPrimary)}
          changeSecondaryColor={changeColor(ColorsKey.SECONDARY, setSecondary)}
          resetPrimaryColor={resetColor(ColorsKey.PRIMARY, DEFAULT_COLOR_BLACK)}
          resetSecondaryColor={resetColor(
            ColorsKey.SECONDARY,
            DEFAULT_COLOR_WHITE,
          )}
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
