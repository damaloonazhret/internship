export const extractColorFromUrl = (url: string) => {
  const color = url.split("/").pop();
  if (color) {
    return color.padStart(6, "0");
  }
  return "".padStart(6, "0");
};
