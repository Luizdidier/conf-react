import React, { Component } from 'react';
import { cloneChildrenAndInjectProps } from '../../utils';

class ConferenceFooter extends Component {
  render() {
    let { conference, provider } = this.props;
    let children = cloneChildrenAndInjectProps(this.props.children, { conference, provider });

    return (
      <div id="cf-video-container-footer">
        {children}
      </div>
    );
  }
}

export default ConferenceFooter;
