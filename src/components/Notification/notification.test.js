import React from 'react';
import { mount } from 'enzyme';
import Notification from './Notification';

describe('Notification component', () => {
  
  describe('has notification prop', () => {
    it('renders component', () => {
      const notification = mount(<Notification notification="someStatus" />);
      expect(notification.find('.notification-status')).toHaveLength(1)
    });
  });
  describe('does not have notification prop', () => {
    it('does not render component', () => {
      const notification = mount(<Notification notification="" />);
      expect(notification.find('.notification-status')).toHaveLength(0)
    })
  })
});