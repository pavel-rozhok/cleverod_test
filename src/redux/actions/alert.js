import {
  ALERT_ON,
  ALERT_CLOSE,
  ALERT_CLEAR_MESSAGE,
} from './actionTypes';

export function alertOpen(payload) {
  return {
    type: ALERT_ON,
    payload: {
      ...payload,
      touchedTime: Date.now(),
    },
  };
}

function alertClose() {
  return {
    type: ALERT_CLOSE,
  };
}

function alertClearMessage() {
  return {
    type: ALERT_CLEAR_MESSAGE,
  };
}

export function alertClear() {
  return (dispatch) => {
    dispatch(alertClose());
    setTimeout(() => {
      dispatch(alertClearMessage());
    }, 500);
  };
}
