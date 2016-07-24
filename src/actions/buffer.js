export function fetchAddToQueue (code, twitterUsername, queue) {
  return (dispatch) => {
    window
      .fetch(`/api/buffer/add?request_token=${code}&twitter_username=${twitterUsername}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(queue),
      });
  };
}
