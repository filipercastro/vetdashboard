export const SIGNED_IN = 'SIGNED_IN';

export function logUser(uid) {
  const action = {
    type: SIGNED_IN,
    uid
  }
  return action;
}
