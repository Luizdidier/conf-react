import React from 'react';
import { mount } from 'enzyme';
import Conference from './index';

describe('rendering component', () => {
  let _setupProvider;
  let provider;
  let conference;

  beforeEach(() => {
    const config = {
      apiKey: 'abc',
      sessionId: '123',
      provider: 'tokbox',
      role: 'provider'
    };

    provider = { connect: jest.fn() };

    _setupProvider = jest.fn(function() {
      this.conference = provider;
    });

    Object.assign(Conference.prototype, {
      _setupProvider
    });

    conference = mount(<Conference config={config} />);
  });

  describe('constructor', () => {
    it('calls setupProvider on instantiation', () => {
      expect(_setupProvider).toHaveBeenCalled();
    });
  });

  describe('componentDidMount', () => {
    it('sets up and connects to a provider', () => {
      expect(provider.connect).toHaveBeenCalled();
    });
  });
});
