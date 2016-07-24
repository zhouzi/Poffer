export function fetchAddToQueue (code, queue) {
  return (dispatch) => {
    window
      .fetch(`/api/buffer/add?request_token=${code}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(queue),
      });
  };
}
