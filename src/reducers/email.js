import { FETCH_USER_SUCCESS } from 'actions/pocket';

export default function email (state = null, action) {
  switch (action.type) {
    case FETCH_USER_SUCCESS:
      return action.payload;

    default:
      return state;
  }
}
