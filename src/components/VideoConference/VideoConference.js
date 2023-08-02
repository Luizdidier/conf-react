import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import { isEmpty } from 'lodash';

import Attendee from '../Attendee';
import Attendees from '../Attendees';
import Conference from '../Conference';
import ConferenceControls, { PublishControl } from '../ConferenceControls';
import Notification from '../Notification';
import Publisher from '../Publisher';
import { logger } from '../../utils';


const SETTINGS = {
        NOTIFICATIONS: {
          CONNECTION_LOST:       'Network connection lost.',
          PATIENT_CONNECTED:     'You connected',
          PATIENT_DISCONNECTED:  'You disconnected',
          PROVIDER_CONNECTED:    'Provider has joined the room.',
          PROVIDER_DISCONNECTED: 'Provider has disconnected.',
          SESSION_RECONNECTED:   'Reconnected',
          SESSION_RECONNECTING:  'Network connection lost. Attempting to reconnect.',
          WAITING_FOR_PATIENT:   'Waiting for patient.'
        },
        REASONS: {
          NETWORK_TIMEDOUT: 'networkTimedout'
        }
      }
    ;

class VideoConference extends Component {
    static propTypes = {
    config: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      show:            false,
      renderPublisher: null,
      isPublished:     false,
      attendees:       [],
      subscribers:     [],
      myStreamId:      null,
      config:          this.props.config,
      notification:    null
    };
  }

  componentWillUnmount = () => {
    const { subscribers } = this.state;
    this.publisher.disconnectSession(subscribers);
    this.publisher.props.provider.session.disconnect();
  }

  bindCustomPublisherEvents = publisher => {
    this.session = publisher.props.provider.session;

    try {
      this.session.on({
        sessionDisconnected: this.onSessionDisconnected,
        sessionReconnected:  this.onSessionReconnected,
        sessionReconnecting: this.onSessionReconnecting
      });
    } catch (error) {
      throw new Error('Could not bind events to publisher!');
    }
  }

  onConnectionLost = () => {
    this.setState({
      show:         false,
      notification: SETTINGS.NOTIFICATIONS.CONNECTION_LOST
    });
  }

  onCreateConference = config => {
    this.setState({ show: true });
  }

  onCreatePublisher = () => {
    this.setState({ renderPublisher: true });
  }

  onCreateAttendee = stream => {
    const { attendees } = this.state
         ,{ userType }  = JSON.parse(stream.connection.data);

    if (userType === "tdoc_member") {
      this.setState({
        attendees:    [...attendees, stream],
        notification: SETTINGS.NOTIFICATIONS.PATIENT_CONNECTED
      });
    }
    else {
      // Not quite sure if we need this...
      this.setState({
        attendees:    [...attendees, stream],
        notification: SETTINGS.NOTIFICATIONS.PROVIDER_CONNECTED
      });
    }
  }

  onDestroyAttendee = stream => {
    const { attendees } = this.state;
    const filteredAttendees = attendees.filter(attendee => attendee !== stream);
    const { userType } = JSON.parse(stream.connection.data);

    if (userType === "tdoc_member") {
      this.setState({
        attendees:    filteredAttendees,
        notification: SETTINGS.NOTIFICATIONS.PATIENT_DISCONNECTED
      });
    } else {
      // Not sure if this is needed or not...
      this.setState({
        attendees:    filteredAttendees,
        notification: SETTINGS.NOTIFICATIONS.PROVIDER_DISCONNECTED
      });
    }
  }

  onPublisherStreamCreated = stream => {
    this.setState({ myStreamId: stream.streamId });
  }

  onSubscriberStreamCreated = subscriber => {
    const { subscribers } = this.state;
    this.setState({ subscribers: [...subscribers, subscriber] });
  }

  onPublished = event => {
    this.bindCustomPublisherEvents(event);
    this.setState({ isPublished: true });
  }

  onRetryConnection = (resolve, reject, error) => {
    if (isEmpty(error)) {
      resolve();
    } else {
      reject(error);
    }
  }

  onSessionDisconnected = stream => {
    // if (stream.reason !== SETTINGS.REASONS.NETWORK_TIMEDOUT) return false;
    if (stream.reason !== SETTINGS.REASONS.NETWORK_TIMEDOUT) {
      this.setState({ isPublished: false });
      return;
    }

    return new Promise((resolve, reject) => {
      stream.target.connect(
        stream.target.apiKey,
        this.onRetryConnection.bind(this, resolve, reject)
      );
    }).then(() => {
      window.location.reload(true);
    }).catch(error => {
      this.onConnectionLost();
    });
  }

  onSessionReconnected = stream => {
    this.setState({ notification: SETTINGS.NOTIFICATIONS.SESSION_RECONNECTED });
  }

  onSessionReconnecting = stream => {
    this.setState({ notification: SETTINGS.NOTIFICATIONS.SESSION_RECONNECTING });
  }

  isOwnStream = stream => stream.streamId === this.state.myStreamId;

  onStartPublisher = () => {
    this.publisher.createPublisher();
    this.setState({
      isPublished:  true,
      notification: SETTINGS.NOTIFICATIONS.PROVIDER_CONNECTED
    });
  }

  onEndCall = () => {
    const { subscribers } = this.state;
    this.publisher.disconnectSession(subscribers);
    this.setState({
      isPublished: false,
      subscribers: []
    })
  }


  renderAttendee = (attendee, index) => {
    if (!attendee) return false;

    const { streamId } = attendee;
    const key = `${streamId}_${index}`;
    const { userType } = JSON.parse(attendee.connection.data);

    return (
      <Attendee
        key={key}
        stream={attendee}
        userType={userType}
        onSubscribed={this.onSubscriberStreamCreated}
        onDestroyed={this.onDestroyAttendee}
      />
    );
  }

  notCompatibleBrowserCheck = () => (
    window.OT.checkSystemRequirements() === 0 && !window.OTPlugin.isSupported()
  )

  render() {
    const {
          config,
          attendees,
          isPublished,
          notification
        } = this.state;

    // Logger is causing issues in IE11. Member is not able to see himself in IE11.
    logger.config({ jwt: config.jwt, baseURL: config.loggerBaseUrl, endpoint: config.loggerEndpoint });

    if (this.notCompatibleBrowserCheck()) {
      return (
        <div className="not-supported-browser">
          <p>Your browser is incompatible with the video component of this application.
          Please upgrade to the latest version of Chrome or Firefox or download our mobile app to have a video consult.</p>
        </div>
      );
    }

    if (!config) return false;

    return (
      <div className="conf-app">
        <div className="conf-app--video">
          <Conference
            config={config}
            onCreatePublisher={this.onCreatePublisher}
            onStreamCreated={this.onCreateAttendee}
          >
            <Attendees>
              <Publisher
                ref={(ele) => this.publisher = ele}
                onPublished={this.onPublished}
                onPublisherStreamCreated={this.onPublisherStreamCreated}
              />
              { attendees.map(this.renderAttendee) }
            </Attendees>
            <Notification notification={notification} />
            <ConferenceControls>
              <PublishControl
                isPublished={isPublished}
                onStart={this.onStartPublisher}
                onEnd={this.onEndCall}
                buttonClass="button"
              />
            </ConferenceControls>
          </Conference>
        </div>
      </div>
    );
  }
}

export default VideoConference;
