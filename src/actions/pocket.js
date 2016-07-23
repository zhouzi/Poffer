export const POCKET_AUTH_SUCCESS = 'POCKET_AUTH_SUCCESS';

export function authSuccess () {
  return {
    type: POCKET_AUTH_SUCCESS
  };
}

export function fetchItems (tag) {
  return (dispatch, getState) => {
    const { request_token } = getState().accounts.pocket;

    window
      .fetch(`/api/pocket/retrieve?request_token=${request_token}&tag=${tag}`, {
        method: 'GET'
      })
      .then((res) => res.json())
      .then((items) => dispatch(fetchItemsSuccess(items)));
  };
}

export const POCKET_FETCH_ITEMS_SUCCESS = 'POCKET_FETCH_ITEMS_SUCCESS';

function fetchItemsSuccess (items) {
  return {
    type: POCKET_FETCH_ITEMS_SUCCESS,
    payload: items
  };
}
