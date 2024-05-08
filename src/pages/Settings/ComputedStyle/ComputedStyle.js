import { Component } from "react";

export class ComputedStyle extends Component {
  render() {
    const { settingsId } = this.props.computedMatch.params;
    return (
      <div className="settings">
        {settingsId.charAt(0).toUpperCase() + settingsId.slice(1)} style
        settings
      </div>
    );
  }
}
