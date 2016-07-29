import { UPDATE_TWEET_TIMES } from 'actions/tweetTimes'

export default function tweetTimes (state = 3, action) {
  switch (action.type) {
    case UPDATE_TWEET_TIMES:
      return action.payload;

    default:
      return state;
  }
}
