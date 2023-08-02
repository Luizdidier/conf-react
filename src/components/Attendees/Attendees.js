import React, { Component } from 'react';
import { cloneChildrenAndInjectProps } from '../../utils';

class Attendees extends Component {
  render() {
    let { conference, provider } = this.props;
    let children = cloneChildrenAndInjectProps(this.props.children, { conference, provider });

    return (
      <div id="cf-video-container--attendees" >
        {children}
      </div>
    );
  }
}

export default Attendees;
