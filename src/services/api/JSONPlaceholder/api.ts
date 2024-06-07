import { LinkColorData } from "../../../pages/JSONPlaceholder/ColorsCC/ColorsCC";

export const colorsRequest = async (): Promise<LinkColorData[]> => {
  const data = await fetch("https://jsonplaceholder.typicode.com/photos/");
  if (!data.ok || !data.ok) {
    await Promise.reject(`${data.url} error ${data.status}`);
  }
  const colors = await data.json();
  return colors;
};
