export const UPDATE_TWEET_TIMES = 'UPDATE_TWEET_TIMES';

export const update = (nb) => {
  return {
    type: UPDATE_TWEET_TIMES,
    payload: nb,
  };
};
