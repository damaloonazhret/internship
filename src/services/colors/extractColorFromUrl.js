export const extractColorFromUrl = (url) => {
  const lastSlashIndex = url.lastIndexOf("/");
  return url.substring(lastSlashIndex + 1);
};
