export const UPDATE_STATUS = 'UPDATE_STATUS';

export function updateStatus (name, value) {
  return {
    type: UPDATE_STATUS,
    payload: {
      name,
      value
    }
  };
}
