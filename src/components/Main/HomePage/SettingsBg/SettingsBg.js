import { DARK } from "../../../App";

export const SettingsBg = (props) => {
  return (
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
        ref={props.theme === DARK ? props.primaryColorRef : props.secondaryColorRef}
        onChange={
          props.theme === DARK ? props.changePrimaryColor : props.changeSecondaryColor
        }
      />
      <button
        className="btn"
        type="button"
        onClick={props.theme === DARK ? props.resetPrimaryColor : props.resetSecondaryColor}
      >
        Reset
      </button>
    </div>
  );
};
