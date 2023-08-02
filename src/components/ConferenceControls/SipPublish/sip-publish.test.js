import React from 'react';
import { mount } from 'enzyme';
import SipPublishControl from './index';

describe('rendering button', () => {

  let warmTransferVendors = [{ id: 1}]

  let onSipStart = jest.fn();

  let component;

  let sipButton = (isSipPublished) => {
    return mount( <SipPublishControl
      isSipPublished={isSipPublished} 
      warmTransferVendors={warmTransferVendors} 
      onSipStart={onSipStart}
      buttonClass="button"
      buttonText="Transfer to Care Coordinator"
    />);
  }

  describe('publish sip button', () => {
    
    it('enables the button', () => {
      component = sipButton(false)
      expect(component.find('button').props().disabled).toEqual(false)
    });

    it('disables the button', () => {
      component = sipButton(true)
      expect(component.find('button').props().disabled).toEqual(true)
    });
  });

  describe('events', () => {

    describe('onSipStart', () => {
      it('calls publish on provider', () => {
        component = sipButton(false)
        component.find('button').simulate('click');
        expect(onSipStart).toHaveBeenCalled();
      });
    });
  });
});