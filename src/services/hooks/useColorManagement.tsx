import {ColorsActionTypes, ColorsKey} from "../../components/common/Enums";
import {colorReducer, ColorsTypes} from "../reducers/colorReducer";
import {useLocalStorage} from "./useLocalStorage";
import {useCallback, useEffect, useReducer, useState} from "react";
import {useThrottle} from "./useThrottle";
import {ThemeColors, SetColorsState} from "../../components/App";
import {ActionType, ColorKeyType} from "../../pages/Settings/ComputedStyle/ComputedStyle";

const getActionType = (
    colorKey: ColorsKey,
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

export const useColorManagement = (initialColorState: ThemeColors, setColors: SetColorsState) => {
    const { setItem, removeItem } = useLocalStorage();

    const [colorState, dispatchColor] = useReducer(
        colorReducer,
        initialColorState,
    );

    const [primary, setPrimary] = useState<string>("");
    const [secondary, setSecondary] = useState<string>("");
    const throttlePrimaryColor = useThrottle(primary || colorState.primary);
    const throttleSecondaryColor = useThrottle(secondary || colorState.secondary);

    const setColor = useCallback(
        (colorKey: ColorsKey, throttledColor: string) => {
            const type = getActionType(colorKey, ColorsActionTypes.SET);

            dispatchColor({
                type,
                payload: throttledColor,
            });

            setItem(colorKey, throttledColor);
        },
        [setItem],
    );

    const resetColor = useCallback(
        (colorKey: keyof ThemeColors, defaultColor: string) => () => {
            const type = getActionType(
                colorKey as ColorKeyType,
                ColorsActionTypes.RESET,
            );

            dispatchColor({
                type,
                payload: defaultColor,
            });

            removeItem(colorKey);
        },
        [removeItem],
    );

    useEffect(() => {
        setColors((prevColors: ThemeColors) => ({ ...prevColors, ...colorState }));
    }, [colorState, setColors]);

    useEffect(() => {
        setColor(ColorsKey.PRIMARY, throttlePrimaryColor);
    }, [throttlePrimaryColor, setColor]);

    useEffect(() => {
        setColor(ColorsKey.SECONDARY, throttleSecondaryColor);
    }, [throttleSecondaryColor, setColor]);

    return { colorState, setPrimary, setSecondary, resetColor };
};
