export function fetchItems (tag) {
  return (dispatch, getState) => {
    const { request_token } = getState().accounts.pocket;

    window
      .fetch(`/api/pocket/retrieve?request_token=${request_token}&tag=${tag}`, {
        method: 'GET'
      })
      .then((res) => {
        const email = res.headers.get('User-Email');

        if (email) {
          dispatch(fetchUserSuccess(email));
        }

        return res.json();
      })
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

export function fetchDeleteItem (item) {
  return (dispatch, getState) => {
    const { email } = getState();

    if (email == null) {
      alert(
        'Ignoring items is a feature that requires storage and thus costs.' +
        'Read more about how you can benefit from it:\n\n' +
        'https://github.com/Zhouzi/Poffer'
      );
      return;
    }

    dispatch(fetchDeleteItemSuccess(item));

    window
      .fetch(`/api/pocket/delete/${item.item_id}?email=${email}`, {
        method: 'POST'
      });
  };
}

export const POCKET_FETCH_DELETE_ITEM_SUCCESS = 'POCKET_FETCH_DELETE_ITEM_SUCCESS';

function fetchDeleteItemSuccess (item) {
  return {
    type: POCKET_FETCH_DELETE_ITEM_SUCCESS,
    payload: item
  };
}

export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';

function fetchUserSuccess (email) {
  return {
    type: FETCH_USER_SUCCESS,
    payload: email
  };
}
