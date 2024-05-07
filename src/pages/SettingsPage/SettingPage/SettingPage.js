import {Component} from "react";

export class SettingPage extends Component {
  render() {
    const {settingsId} = this.props.computedMatch.params;
    return (
      <div className='settings'>{settingsId.charAt(0).toUpperCase() + settingsId.slice(1)} settings</div>
    )
  }
}
