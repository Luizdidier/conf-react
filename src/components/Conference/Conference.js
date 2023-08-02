import React, { Component } from 'react';

import { lookup } from '../../providers';


import {
  assert,
  cloneChildrenAndInjectProps
} from '../../utils';

const DEFAULTS = {
  HOST_CONTAINER: 'cf-video-container--host',
  ATTENDEES_CONTAINER: 'cf-video-container--attendees'
};

/**
  * React.Component representing a video Conference.
  *
  * @class
  */
class Conference extends Component {
  static get defaultProps() {
    return {
      onCreatePublisher: () => {}
    };
  }

  /**
   * Creates a video Conference.
   *
   * @param {object} props - Properties to be used within the component.
   */
  constructor(props) {
    super(props);

    const { config } = this.props;
    const finalConfig = {
      ...config,
      hostElement: DEFAULTS.HOST_CONTAINER,
      attendeesElement: DEFAULTS.ATTENDEES_CONTAINER
    };

    this._setupProvider(finalConfig);
  }

  /**
   * When the component is mounted, create and connect to the Provider.
   *
   * @function
   * @protected
   */
  componentDidMount() {
    this.conference.connect();
  }

  onCreatePublisher() {
    this.props.onCreatePublisher();
  }

  onStreamCreated(event) {
    this.props.onStreamCreated(event);
  }

  /**
   * React.Component#render hook. Used to render the elements used to compose the video conference.
   *
   * @function
   * @protected
   */
  render() {
    let { config } = this.props;

    assert(config, 'Please supply a config.');

    let conference = this;
    let provider = this.conference;

    let children = cloneChildrenAndInjectProps(this.props.children, { conference, provider });

    return (
      <div id="cf-video-container">
        {children}
      </div>
    );
  }

  /**
   * Sets up the provider to be used.
   *
   * @private
   */
  _setupProvider(config) {
    const { provider } = config;

    assert(provider, 'Please supply a provider in your config');

    const Provider = lookup(provider)
        , conference = new Provider({
      props:     config,
      component: this
    });

    this.conference = conference;

    this._setupProviderEvents();

    const { onVideoProviderCreated } = this.props;
    if (onVideoProviderCreated) {
      onVideoProviderCreated(this.conference);
    }
  }

  /**
   * Sets up events for the provider.
   *
   * @private
   */
  _setupProviderEvents() {
    this.conference.on('onCreatePublisher', this.onCreatePublisher.bind(this));
    this.conference.on('onStreamCreated', this.onStreamCreated.bind(this));
  }
}

export default Conference;
