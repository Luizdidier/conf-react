import React, { Component } from 'react';

/**
  * React.Component representing a control for publishing.
  *
  * @class
  */
class PublishControl extends Component {
  /**
   * Returns a String representing the text for the control.
   *
   * @function
   * @returns {String}
   * @public
   */
  renderText() {
    let { isPublished } = this.props;
    let text = 'Start Call';

    if (isPublished) {
      text = 'End Call';
    }

    return text;
  }

  /**
   * Renders the control.
   *
   * @function
   * @public
   */
  render() {
    const { isPublished,
            onStart,
            onEnd,
            buttonClass
          } = this.props
        , role = this._getRole()
        , action = isPublished ? onEnd : onStart;
    
    if (role === 'member') return null;
    
    return (
      <button className={buttonClass} onClick={action}>
        {this.renderText()}
      </button>
    );
  }

  /**
   * Returns the role from the conference object.
   *
   * @returns {String}
   * @private
   */
  _getRole() {
    let { conference } = this.props;
    let { config } = conference.props;
    let { role } = config;

    return role;
  }
}

export default PublishControl;
