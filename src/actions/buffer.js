export const BUFFER_AUTH_SUCCESS = 'BUFFER_AUTH_SUCCESS';

export function authSuccess (request_token) {
  return {
    type: BUFFER_AUTH_SUCCESS,
    payload: request_token
  };
}