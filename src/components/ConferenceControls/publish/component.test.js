import React from 'react';
import { mount } from 'enzyme';
import PublishControl from './index';

describe('rendering component', () => {
  let conference = {
    props: {
      config: {
        role: 'provider'
      },
    buttonClass: 'someClass'
    }
  }
  let onStart = jest.fn();
  let onEnd = jest.fn();

  describe('public api', () => {
    let component;

    describe('renderText', () => {
      beforeEach(() => {
        component = new PublishControl({ isPublished: false });
      });

      afterEach(() => {
        component.props.isPublished = false;
      });

      it('returns "Start Call" if unpublished', () => {
        expect(component.renderText()).toEqual('Start Call');
      });

      it('returns "End Call" if unpublished', () => {
        component.props.isPublished = true;

        expect(component.renderText()).toEqual('End Call');
      });
    });
  });
  describe('button props', () => {
    let component;
    beforeEach(() => {
      component = mount(
        <PublishControl
          conference={conference}
          isPublished={false}
          onStart={onStart}
          onEnd={onEnd}
          buttonClass='someClass'
        />
      );
    });

    it('has buttonClass property', () => {
      expect(component.find('button').hasClass('someClass')).toEqual(true)
    })
  })
  describe('events', () => {
    let component;

    beforeEach(() => {
        component = mount(
          <PublishControl
            conference={conference}
            isPublished={false}
            onStart={onStart}
            onEnd={onEnd}
            buttonClass='buttonClass'
          />
        );
    });

    describe('onStart', () => {
      it('calls publish on provider', () => {
        component.find('button').simulate('click');
        expect(onStart).toHaveBeenCalled();
      });
    });

    describe('onEnd', () => {
      let component;

      beforeEach(() => {
        component = mount(
          <PublishControl
            conference={conference}
            isPublished={true}
            onStart={onStart}
            onEnd={onEnd}
            buttonClass='buttonClass'
          />
        );
      });

      it('calls unpublish on provider', () => {
        component.find('button').simulate('click');
        expect(onEnd).toHaveBeenCalled();
      });
    });
  });
});
