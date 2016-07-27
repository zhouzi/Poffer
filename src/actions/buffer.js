import { updateStatus } from 'actions/status';

export function fetchAddToQueue (code, twitterUsername, queue) {
  return (dispatch, getState) => {
    const email = getState().email || '';

    dispatch(updateStatus('addToBufferQueue', 'loading'));

    window
      .fetch(`/api/buffer/add?request_token=${code}&twitter_username=${twitterUsername}&email=${email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(queue),
      })
      .then((res) => {
        dispatch(updateStatus('addToBufferQueue', 'ready'));

        if (res.status >= 200 && res.status < 300) {
          alert('Yay! The tweets have been added to your Buffer queue :)');
        } else {
          res.json().then((json) => alert(json.message))
        }
      });
  };
}
