import { DARK } from "../../../App";

export const SettingsTxt = (props) => {
  return (
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
        ref={props.theme === DARK ? props.secondaryColorRef : props.primaryColorRef}
        onChange={
          props.theme === DARK ? props.changeSecondaryColor : props.changePrimaryColor
        }
      />
      <button
        className="btn"
        type="button"
        onClick={props.theme === DARK ? props.resetSecondaryColor : props.resetPrimaryColor}
      >
        Reset
      </button>
    </div>
  );
};
