import React, { Component } from 'react';
import { mount } from 'enzyme';
import ConferenceFooter from './index';

describe('rendering component', () => {
  let component;
  let conference = {};
  let provider = {};

  class ChildComponent extends Component {
    render() {
      return <strong>Hi!</strong>;
    }
  };

  beforeEach(() => {
    component = mount(
      <ConferenceFooter conference={conference} provider={provider}>
        <ChildComponent />
      </ConferenceFooter>
    );
  });

  describe('child components', () => {
    it('receives a reference to conference automatically', () => {
      expect(component.find(ChildComponent).prop('conference')).toEqual(conference);
    });

    it('receives a reference to provider automatically', () => {
      expect(component.find(ChildComponent).prop('provider')).toEqual(provider);
    });
  });
});
