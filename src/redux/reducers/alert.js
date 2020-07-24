import {
  ALERT_ON,
  ALERT_CLOSE,
  ALERT_CLEAR_MESSAGE,
} from '../actions/actionTypes';

const initalState = {
  open: false,
  type: 'error',
  vertical: 'top',
  horizontal: 'center',
  message: '',
  touchedTime: null,
};

export default function alertReducer(state = { ...initalState }, action) {
  switch (action.type) {
    case ALERT_ON:
      return {
        ...state,
        open: true,
        ...action.payload,
      };
    case ALERT_CLOSE:
      return { ...initalState, message: state.message };
    case ALERT_CLEAR_MESSAGE:
      return { ...initalState };
    default:
      return { ...state };
  }
}
