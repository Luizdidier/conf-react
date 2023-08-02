
import { mount } from 'enzyme';
import Publisher from './index';

describe('Publisher', () => {
  describe('public api', () => {
    describe('componentDidMount', () => {
      describe('autoPublish', () => {
        let component
          , publisher = {
              on: jest.fn(),
              onPublisherStreamCreated: jest.fn(() => 'streamCreated')
            }
          , provider = {
            session: {
              publish: jest.fn(),
              on: jest.fn()
            }
          , createPublisher: () => publisher,
              on: jest.fn()
            }
          , element = {};

        beforeEach(() => {
          component = new Publisher({ provider, autoPublish: true });
          component._getElement = jest.fn(() => element);
          component.componentDidMount();
        });

        afterEach(() => {
          jest.resetAllMocks();
        });

        it('publishes when sessionConnected event is triggered', () => {
          let [ event ] = provider.session.on.mock.calls[0];
          expect(event).toEqual('sessionConnected');
        });
      });
    });

    describe('onPublished', () => {
      let component
        , onPublished = jest.fn();

      beforeEach(() => {
        component = new Publisher({ onPublished });
        component.onPublished();
      });

      it('calls the onPublished prop', () => {
        expect(onPublished).toHaveBeenCalled();
      });
    });
  });
});
