import React, { Component } from 'react';
import PropTypes from 'prop-types';
/**
  * React.Component representing a control for SIP Call publishing.
  *
  * @class
  */
class SipPublishControl extends Component {

  renderButton = () => ( 
     <span>
      {this.props.warmTransferVendors.map( vendor => (
        <span key={vendor.id}>
          &nbsp;
          <button
            disabled={this.props.isSipPublished}
            className={this.props.buttonClass}
            onClick={this.props.onSipStart}
          >
            {this.props.buttonText}
          </button>
        </span>
      ))}
    </span>
  );

  /**
   * Renders the control.
   *
   * @function
   * @public
   */
  render() {
    return (
      this.renderButton()
    );
  }

}

SipPublishControl.propTypes = {
  onSipStart:          PropTypes.func.isRequired,
  warmTransferVendors: PropTypes.array.isRequired,
  isSipPublished:      PropTypes.bool.isRequired,
  buttonClass:         PropTypes.string.isRequired,
  buttonText:          PropTypes.string.isRequired
};

export default SipPublishControl;
