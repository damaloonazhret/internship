import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useReducer,
  useRef,
} from "react";
import { fontReducer } from "../../../services/reducers/fontReducer";
import { Title } from "../../../components/common/InfoText/Title";
import { useLocalStorage } from "../../../services/hooks/useLocalStorage";
import {
  DEFAULT_COLOR_BLACK,
  DEFAULT_COLOR_WHITE,
} from "../../../components/constants/constants";
import { ColorsPage, FontsPage } from "../index";
import {
  ThemeColorsState,
  SetColorsState,
  ThemeState,
} from "../../../components/App";
import { RefObjectWithValue } from "../../../components/common/Input/Input";
import { useParams } from "react-router-dom";
import { ColorsKey, FontsActionTypes } from "../../../components/common/Enums";
import { useColorManagement } from "../../../services/hooks/useColorManagement";

interface ComputedStyleProps {
  colors: ThemeColorsState;
  theme: ThemeState;
  setColors: SetColorsState;
}

export type ColorKeyType = ColorsKey.PRIMARY | ColorsKey.SECONDARY;

export type ActionType = "SET" | "RESET";

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
  const primaryColorRef = useRef<RefObjectWithValue>(null);
  const secondaryColorRef = useRef<RefObjectWithValue>(null);

  const { getItem } = useLocalStorage();

  const initialFontState = { fontSize: Number(getItem("FS")) || 16 };
  const initialColorState = {
    primary: colors.primary,
    secondary: colors.secondary,
  };

  const [fontState, dispatchFont] = useReducer(fontReducer, initialFontState);

  const { colorState, setPrimary, setSecondary, resetColor } =
    useColorManagement(initialColorState, setColors);

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
