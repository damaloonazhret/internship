import { Fonts } from "./Fonts";
import { Colors } from "./Colors";

export const ComputedStyle = (props) => {
  const { settingsId } = props.computedMatch.params;
  const pageName = settingsId.charAt(0).toUpperCase() + settingsId.slice(1);

  let componentToRender;

  switch (pageName) {
    case "Colors":
      componentToRender = <Colors name={pageName} />;
      break;
    case "Fonts":
      componentToRender = <Fonts name={pageName} />;
      break;
    default:
      componentToRender = null;
  }

  return <div className="settings">{componentToRender}</div>;
};
