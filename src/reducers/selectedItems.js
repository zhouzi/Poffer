import { POCKET_SELECT_ITEMS } from 'actions/pocket';

export default function items (state = [], action) {
  switch (action.type) {
    case POCKET_SELECT_ITEMS:
      return action.payload;

    default:
      return state;
  }
}
