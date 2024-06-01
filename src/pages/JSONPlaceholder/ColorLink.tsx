import { extractColorFromUrl } from "../../services/colors/extractColorFromUrl";
import { Text } from "../../components/common/InfoText/Text";
import { CustomLink } from "../../components/common/CustomLink";
import { FC, useEffect, useState } from "react";

export interface Color {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface ColorLinkProps {
  color: Color;
  id: number;
  activities: { [key: string]: string };
}

export const ColorLink: FC<ColorLinkProps> = ({
  color,
  id,
  activities,
}) => {
  const bgColor = extractColorFromUrl(color.thumbnailUrl);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (activities[id] === "true") {
      setActive(true);
    }
  }, [id, activities]);

  const handleClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (active) {
      setActive(false);
      sessionStorage.removeItem(String(id));
    } else {
      setActive(true);
      sessionStorage.setItem(String(id), "true");
    }
  };
  return (
    <li>
      <CustomLink
        style={{ backgroundColor: `#${bgColor}` }}
        href={color.thumbnailUrl}
        onClick={handleClick}
        className={active ? "active" : ""}
      >
        <Text style={{ visibility: "hidden" }} text={color.title} />
      </CustomLink>
    </li>
  );
};
