export const getAllCookieNames = () => {
  const cookies = document.cookie;
  const cookieArray = cookies.split(';');
  const cookieNames = cookieArray.map(cookie => cookie.split('=')[0].trim());
  return cookieNames;
}
