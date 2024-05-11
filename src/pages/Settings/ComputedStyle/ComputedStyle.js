export const ComputedStyle = (props) => {
  const { settingsId } = props.computedMatch.params;
  return (
    <div className="settings">
      {settingsId.charAt(0).toUpperCase() + settingsId.slice(1)} style settings
    </div>
  );
};
