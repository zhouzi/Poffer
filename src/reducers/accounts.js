const initialState = {
  buffer: {
    client_id: null,
    redirect_uri: null,
  },
  pocket: {
    request_token: null,
    redirect_uri: null,
  }
};

export default function accounts (state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
