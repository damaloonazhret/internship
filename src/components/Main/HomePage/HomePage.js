import './index.css'
import { useRef } from "react";

const HomePage = (props) => {
  const primaryColorRef = useRef(null);
  const secondaryColorRef = useRef(null);
  const DARK = "dark";

  const DEFAULT_COLOR_WHITE = "#ffffff";
  const DEFAULT_COLOR_BLACK = "#1a1a1a";

  const resetPrimaryColor = () => {
    props.setColors({
      ...props.colors,
      primary: DEFAULT_COLOR_BLACK
    })
  }
  const resetSecondaryColor = () => {
    props.setColors({
      ...props.colors,
      secondary: DEFAULT_COLOR_WHITE
    })
  }

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
      secondary: newSecondaryColor
    });
  };

  return (
    <article>
      <h2 className="settings-title">Settings Page</h2>
      <div className="setting">
        <label htmlFor="text">
          And here you can choose the background color on the site
        </label>
        <input
          id="text"
          value={props.theme === DARK ? props.colors.primary : props.colors.secondary}
          placeholder=""
          name="color"
          type="color"
          ref={props.theme === DARK ? primaryColorRef : secondaryColorRef}
          onChange={props.theme === DARK ? changePrimaryColor : changeSecondaryColor}
        />
        <button
          id="reset-text"
          type="button"
          onClick={props.theme === DARK ? resetPrimaryColor : resetSecondaryColor}
        >
          Reset
        </button>
      </div>
      <div className="setting">
        <label htmlFor="text">
          Here you can set your text content color for the page
        </label>
        <input
          id="text"
          value={props.theme === DARK ? props.colors.secondary : props.colors.primary}
          placeholder=""
          name="color"
          type="color"
          ref={props.theme === DARK ? secondaryColorRef : primaryColorRef}
          onChange={props.theme === DARK ? changeSecondaryColor : changePrimaryColor}
        />
        <button
          id="reset-text"
          type="button"
          onClick={props.theme === DARK ? resetSecondaryColor : resetPrimaryColor}
        >
          Reset
        </button>
      </div>
    </article>
  );

};

export default HomePage;
