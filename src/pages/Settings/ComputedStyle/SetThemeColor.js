import { DARK } from "../../../components/common/constants/constants";

export const SetThemeColor = (props) => {
  return (
    <>
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
          ref={
            props.theme === DARK
              ? props.primaryColorRef
              : props.secondaryColorRef
          }
          onChange={
            props.theme === DARK
              ? props.changePrimaryColor
              : props.changeSecondaryColor
          }
        />
        <button
          className="btn"
          type="button"
          onClick={
            props.theme === DARK
              ? props.resetPrimaryColor
              : props.resetSecondaryColor
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
          ref={
            props.theme === DARK
              ? props.secondaryColorRef
              : props.primaryColorRef
          }
          onChange={
            props.theme === DARK
              ? props.changeSecondaryColor
              : props.changePrimaryColor
          }
        />
        <button
          className="btn"
          type="button"
          onClick={
            props.theme === DARK
              ? props.resetSecondaryColor
              : props.resetPrimaryColor
          }
        >
          Reset
        </button>
      </div>
    </>
  );
};
