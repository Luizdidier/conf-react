import React, { Component } from 'react';
import { cloneChildrenAndInjectProps } from '../../utils';

/**
  * React.Component representing the global control for a conference.
  *
  * @class
  */
class ConferenceControls extends Component {
  /**
   * Renders the wrapper div for the conference controls and its children.
   *
   * @function
   * @protected
   */
  render() {
    const { conference } = this.props;
    const children = cloneChildrenAndInjectProps(this.props.children, { conference });

    return (
      <div id="cf-video-container--controls">
        {children}
      </div>
    );
  }
}

export default ConferenceControls;
