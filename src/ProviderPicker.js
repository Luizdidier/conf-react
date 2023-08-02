import React, { Component } from 'react';
import './ProviderPicker.css';

class ProviderPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      apiKey: '',
      sessionId: '',
      token: '',
      role: 'member',
      layout: 'fullscreen'
    };

    this.onConnect = this.onConnect.bind(this);
    this.onApiKeyChange = this.onApiKeyChange.bind(this);
    this.onSessionIdChange = this.onSessionIdChange.bind(this);
    this.onTokenChange = this.onTokenChange.bind(this);
    this.onRoleChange = this.onRoleChange.bind(this);
    this.onLayoutChange = this.onLayoutChange.bind(this);
  }

  onApiKeyChange(event) {
    let state = Object.assign(this.state, { apiKey: event.target.value });

    this.setState(state);
  }

  onSessionIdChange(event) {
    let state = Object.assign(this.state, { sessionId: event.target.value });

    this.setState(state);
  }

  onTokenChange(event) {
    let state = Object.assign(this.state, { token: event.target.value });

    this.setState(state);
  }

  onRoleChange(event) {
    let state = Object.assign(this.state, { role: event.target.value  });

    this.setState(state);
  }

  onLayoutChange(event) {
    let state = Object.assign(this.state, { layout: event.target.value  });

    this.setState(state);
  }

  onConnect() {
    let { apiKey, sessionId, token, role, layout } = this.state;

    this.props.onCreateConference({
      apiKey,
      sessionId,
      token,
      provider: 'tokbox',
      role,
      layout
    });
  }

  render() {
    return (
      <div className="cf-provider-picker">
        <strong>Provider</strong>
        <div className="cf-provider-form">
          <div className="cf-provider-fieldset">
           <select>
              <option>TokBox</option>
            </select>
            <input placeholder="API Key" value={this.state.apiKey} onChange={this.onApiKeyChange} />
            <input placeholder="Session ID" value={this.state.sessionId} onChange={this.onSessionIdChange} />
            <input placeholder="Token" value={this.state.token} onChange={this.onTokenChange} />
            <select onChange={this.onRoleChange}>
              <option value="member">As Member</option>
              <option value="provider">As Provider</option>
            </select>
            <select onChange={this.onLayoutChange}>
              <option value="fullscreen">fullscreen</option>
              <option value="boxed host--fullscreen">boxed (host fullscreen)</option>
              <option value="boxed host--boxed">boxed (host boxed)</option>
            </select>
          </div>
          <button onClick={this.onConnect}>
            Connect
          </button>
        </div>
      </div>
    );
  }
}

export default ProviderPicker;
