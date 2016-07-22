import { combineReducers } from 'redux';
import accounts from './accounts';
import items from './items';
import selectedItems from './selectedItems';

export default combineReducers({
  accounts,
  items,
  selectedItems,
});
