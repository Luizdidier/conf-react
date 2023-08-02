import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';


const Notification = props => {

  if(isEmpty(props.notification)) {
    return false;
  }
  return (
    <div className='notification-status'>
      <p>
        { props.notification }
      </p>
    </div>
  );
}

Notification.propTypes = {
  notification: PropTypes.string
}

export default Notification;