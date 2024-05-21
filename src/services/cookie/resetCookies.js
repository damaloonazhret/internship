export const resetCookies = (name, value) => {
  const expires = new Date();
  expires.setTime(expires.getTime());
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};
