import { extractColorFromUrl } from "../../services/colors/extractColorFromUrl";
import { Text } from "../../components/common/InfoText/Text";
import { CustomLink } from "../../components/common/CustomLink";
import { FC, useEffect, useState } from "react";
import { LinkColorData, UserSelectedColors } from "./ColorsCC/ColorsCC";
import { useLocation } from "react-router-dom";

interface ColorLinkProps {
  color: LinkColorData;
  id: number;
  activities: UserSelectedColors;
}

export const ColorLink: FC<ColorLinkProps> = ({ color, id, activities }) => {
  const bgColor = extractColorFromUrl(color.thumbnailUrl);
  const [active, setActive] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

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
        onClick={pathname === "/colorsCC" ? handleClick : undefined}
        className={active ? "active" : ""}
      >
        <Text style={{ visibility: "hidden" }} text={color.title} />
      </CustomLink>
    </li>
  );
};
