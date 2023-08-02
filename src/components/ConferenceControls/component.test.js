import React, { Component } from 'react';
import { mount } from 'enzyme';
import ConferenceControls from './index';

describe('rendering component', () => {
  let component;
  let conference = {};

  class ChildComponent extends Component {
    render() {
      return <strong>Hi!</strong>;
    }
  };

  beforeEach(() => {
    component = mount(
      <ConferenceControls conference={conference}>
        <ChildComponent />
      </ConferenceControls>
    );
  });

  describe('child components', () => {
    it('receives a reference to conference automatically', () => {
      expect(component.find(ChildComponent).prop('conference')).toEqual(conference);
    });
  });
});
