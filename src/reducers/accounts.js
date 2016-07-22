import { POCKET_AUTH_SUCCESS } from 'actions/pocket';
import { BUFFER_AUTH_SUCCESS } from 'actions/buffer';

const initialState = {
  buffer: {
    succeed: false,
    client_id: null,
    redirect_uri: null,
    request_token: null
  },
  pocket: {
    succeed: false,
    request_token: null,
    redirect_uri: null
  }
};

export default function accounts (state = initialState, action) {
  switch (action.type) {
    case POCKET_AUTH_SUCCESS:
      return {
        ...state,
        pocket: {
          ...state.pocket,
          succeed: true
        }
      };

    case BUFFER_AUTH_SUCCESS:
      return {
        ...state,
        buffer: {
          ...state.buffer,
          request_token: action.payload,
          succeed: true
        }
      };

    default:
      return state;
  }
}
