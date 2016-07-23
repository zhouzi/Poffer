import { combineReducers } from 'redux';
import accounts from './accounts';
import items from './items';
import tweetTimes from './tweetTimes';

export default combineReducers({
  accounts,
  items,
  tweetTimes,
});
