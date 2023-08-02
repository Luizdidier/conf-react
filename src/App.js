import React, { Component } from 'react';
import ProviderPicker from './ProviderPicker';
import Conference from './components/Conference';
import ConferenceControls from './components/ConferenceControls';
import PublishControl from './components/ConferenceControls/publish';
import ConferenceFooter from './components/conferenceFooter';
import Attendees from './components/Attendees';
import Attendee from './components/Attendee';
import Publisher from './components/Publisher';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      config: null,
      renderPublisher: null,
      isPublished: false,
      attendees: []
    };

    this.onCreateConference = this.onCreateConference.bind(this);
    this.onCreatePublisher = this.onCreatePublisher.bind(this);
    this.onCreateAttendee = this.onCreateAttendee.bind(this);
    this.onDestroyAttendee = this.onDestroyAttendee.bind(this);
    this.onPublished = this.onPublished.bind(this);
  }

  onCreateConference(config) {
    let state = Object.assign(this.state, { show: true, config });

    this.setState(state);
  }

  onCreatePublisher() {
    let { renderPublisher } = this.state;

    renderPublisher = true;

    let state = Object.assign(this.state, { renderPublisher });

    this.setState(state);
  }

  onCreateAttendee(stream) {
    let { attendees } = this.state;

    attendees.push({ stream });

    let state = Object.assign(this.state, { attendees });

    this.setState(state);
  }

  onDestroyAttendee(stream) {
    let { attendees } = this.state;

    attendees = attendees.filter(attendee => attendee.stream !== stream);

    let state = Object.assign(this.state, { attendees });

    this.setState(state);
  }

  onPublished() {
    let isPublished = true;

    let state = Object.assign(this.state, { isPublished  });

    this.setState(state);
  }

  renderAttendee(attendee, index) {
    if (!attendee) return null;

    let { stream } = attendee;
    let key = stream.streamId + '_' + index;

    return <Attendee key={key} stream={stream} onDestroyed={this.onDestroyAttendee} />;
  }

  renderConference() {
    if (!this.state.show) return null;

    let {
      attendees,
      config,
      isPublished,
      renderPublisher
    } = this.state;

    let mainAttendee = attendees[0];
    attendees = attendees.slice(1, attendees.length);
    let conference = (
      <div className={'conference conference--' + config.layout}>
        <Conference config={config}
          onCreatePublisher={this.onCreatePublisher}
          onStreamCreated={this.onCreateAttendee}>
          { [mainAttendee].map(this.renderAttendee.bind(this)) }
          <ConferenceFooter>
            <ConferenceControls>
              <PublishControl isPublished={isPublished} />
            </ConferenceControls>
            <Attendees>
              { (renderPublisher) ? <Publisher onPublished={this.onPublished} /> : '' }
              { attendees.map(this.renderAttendee.bind(this)) }
            </Attendees>
          </ConferenceFooter>
        </Conference>
      </div>
    );

    return conference;
  }

  render() {
    return (
      <div>
        {this.renderConference()}
        <ProviderPicker onCreateConference={this.onCreateConference} />
      </div>
    );
  }
}

export default App;
