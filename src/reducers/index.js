import { combineReducers } from 'redux';
import accounts from './accounts';
import items from './items';
import tweetTimes from './tweetTimes';
import email from './email';

export default combineReducers({
  accounts,
  items,
  tweetTimes,
  email,
});
