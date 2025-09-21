export const validateConnectionParams = (url, token) => {
  return url && url.startsWith('ws') && token && token.length > 0;
};

export const validateConnectionState = (state) => {
  return state && typeof state === 'object';
};
