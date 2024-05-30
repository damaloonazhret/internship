import { extractColorFromUrl } from "../../services/colors/extractColorFromUrl";
import { Text } from "../../components/common/InfoText/Text";
import { CustomLink } from "../../components/common/CustomLink";
import { FunctionComponent, MouseEvent } from "react";

export interface Color {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface ColorLinkProps {
  color: Color;
  onClick: (e: MouseEvent<HTMLAnchorElement>, id: number) => void;
  isActive: boolean;
}

export const ColorLink: FunctionComponent<ColorLinkProps> = ({
  color,
  onClick,
  isActive,
}) => {
  const bgColor = extractColorFromUrl(color.thumbnailUrl);

  return (
    <li>
      <CustomLink
        style={{ backgroundColor: `#${bgColor}` }}
        href={color.thumbnailUrl}
        onClick={(e) => onClick(e, color.id)}
        className={isActive ? "active" : ""}
      >
        <Text style={{ visibility: "hidden" }} text={color.title} />
      </CustomLink>
    </li>
  );
};
