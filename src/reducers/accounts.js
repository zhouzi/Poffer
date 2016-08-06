import { UPDATE_REQUEST_TOKEN as UPDATE_POCKET_REQUEST_TOKEN } from 'actions/pocket';

const initialState = {
  buffer: {
    client_id: null,
    redirect_uri: null,
  },
  pocket: {
    request_token: null,
  }
};

export default function accounts (state = initialState, action) {
  switch (action.type) {
    case UPDATE_POCKET_REQUEST_TOKEN:
      return {
        ...state,
        pocket: {
          ...state.pocket,
          request_token: action.payload
        }
      };

    default:
      return state;
  }
}
