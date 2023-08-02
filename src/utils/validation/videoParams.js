import { isEmpty } from 'lodash';

function isBadVideoParams(videoParams) {
  if (!videoParams) {
    return true;
  }

  if (isEmpty(videoParams.sessionId)) {
    return true;
  }

  return false;
}

export {
  isBadVideoParams
};
