import { UPDATE_STATUS } from 'actions/status';

export default function status (state = {}, action) {
  switch (action.type) {
    case UPDATE_STATUS:
      return {
        ...state,
        [action.payload.name]: action.payload.value
      };

    default:
      return state;
  }
}
