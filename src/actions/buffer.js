export function fetchAddToQueue (code, twitterUsername, queue) {
  return (dispatch, getState) => {
    const email = getState().email || '';

    window
      .fetch(`/api/buffer/add?request_token=${code}&twitter_username=${twitterUsername}&email=${email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(queue),
      });
  };
}
