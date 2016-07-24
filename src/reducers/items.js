import omitBy from 'lodash/omitBy';
import { POCKET_FETCH_ITEMS_SUCCESS, POCKET_FETCH_DELETE_ITEM_SUCCESS } from 'actions/pocket';

export default function items (state = null, action) {
  switch (action.type) {
    case POCKET_FETCH_DELETE_ITEM_SUCCESS:
      const { item_id } = action.payload;
      return omitBy(state, (item) => item.item_id === item_id);

    case POCKET_FETCH_ITEMS_SUCCESS:
      return action.payload;

    default:
      return state;
  }
}
