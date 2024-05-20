export const extractColorFromUrl = (url) => {
  return url.split('/').pop().padStart(6, '0');
};
