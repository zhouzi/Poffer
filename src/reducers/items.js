import { POCKET_FETCH_ITEMS_SUCCESS } from 'actions/pocket';

export default function items (state = null, action) {
  switch (action.type) {
    case POCKET_FETCH_ITEMS_SUCCESS:
      return action.payload;

    default:
      return state;
  }
}
