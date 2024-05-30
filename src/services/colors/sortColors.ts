import { rgbToHsl } from "./rgbToHsl";
import { hexToRgb } from "./hexToRgb";
import { extractColorFromUrl } from "./extractColorFromUrl";

interface Color {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

type Colors = Color[];

export const sortColors = (colors: Colors): Colors => {
  return colors.toSorted((a, b) => {
    const colorF = extractColorFromUrl(a.thumbnailUrl);
    const colorL = extractColorFromUrl(b.thumbnailUrl);

    const hslF = rgbToHsl(hexToRgb(colorF));
    const hslL = rgbToHsl(hexToRgb(colorL));

    if (hslF[0] !== hslL[0]) return hslF[0] - hslL[0];
    if (hslF[1] !== hslL[1]) return hslF[1] - hslL[1];
    return hslF[2] - hslL[2];
  });
};
