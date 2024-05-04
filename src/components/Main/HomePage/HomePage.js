import "./index.css";
import {memo, useReducer, useRef} from "react";
import {DARK} from "../../App";

const HomePage = (props) => {
  const primaryColorRef = useRef(null);
  const secondaryColorRef = useRef(null);

  const DEFAULT_COLOR_WHITE = "#ffffff";
  const DEFAULT_COLOR_BLACK = "#1a1a1a";

  const resetPrimaryColor = () => {
    props.setColors({
      ...props.colors,
      primary: DEFAULT_COLOR_BLACK,
    });
  };
  const resetSecondaryColor = () => {
    props.setColors({
      ...props.colors,
      secondary: DEFAULT_COLOR_WHITE,
    });
  };

  const changePrimaryColor = () => {
    const newPrimaryColor = primaryColorRef.current.value;
    props.setColors({
      ...props.colors,
      primary: newPrimaryColor,
    });
  };

  const changeSecondaryColor = () => {
    const newSecondaryColor = secondaryColorRef.current.value;
    props.setColors({
      ...props.colors,
      secondary: newSecondaryColor,
    });
  };

  const initialState = {
    fontSize: 16,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "INCREMENT":
        document.documentElement.style.fontSize = `${state.fontSize + action.payload}px`;
        return { ...state, fontSize: state.fontSize + action.payload };
      case "DECREMENT":
        document.documentElement.style.fontSize = `${state.fontSize - action.payload}px`;
        return { ...state, fontSize: state.fontSize - action.payload };
      case "RESET":
        document.documentElement.style.fontSize = `${action.payload}px`;
        return { ...state, fontSize: action.payload };
      default:
        return state;
    }
  };

  const [count, dispatch] = useReducer(reducer, initialState, undefined);

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
      <div className="settings__bg">
        <label htmlFor="text">
          And here you can choose the background color on the site
        </label>
        <input
          id="text"
          value={
            props.theme === DARK ? props.colors.primary : props.colors.secondary
          }
          placeholder=""
          name="color"
          type="color"
          ref={props.theme === DARK ? primaryColorRef : secondaryColorRef}
          onChange={
            props.theme === DARK ? changePrimaryColor : changeSecondaryColor
          }
        />
        <button
          className="btn"
          type="button"
          onClick={
            props.theme === DARK ? resetPrimaryColor : resetSecondaryColor
          }
        >
          Reset
        </button>
      </div>
      <div className="settings__txt">
        <label htmlFor="text">
          Here you can set your text content color for the page
        </label>
        <input
          id="text"
          value={
            props.theme === DARK ? props.colors.secondary : props.colors.primary
          }
          placeholder=""
          name="color"
          type="color"
          ref={props.theme === DARK ? secondaryColorRef : primaryColorRef}
          onChange={
            props.theme === DARK ? changeSecondaryColor : changePrimaryColor
          }
        />
        <button
          className="btn"
          type="button"
          onClick={
            props.theme === DARK ? resetSecondaryColor : resetPrimaryColor
          }
        >
          Reset
        </button>
      </div>
      <div className="settings__font">
        <p>Value: {count.fontSize}px </p>
        <p>Here you can set a custom font size for the entire page</p>
        <button className="btn" onClick={decrement}>
          decrease
        </button>
        <button className="btn" onClick={reset}>
          reset
        </button>
        <button className="btn" onClick={increment}>
          increase
        </button>
      </div>
    </article>
  );
};

export default memo(HomePage);
