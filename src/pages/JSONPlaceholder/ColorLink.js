import { extractColorFromUrl } from "../../services/colors/extractColorFromUrl";
import { Text } from "../../components/common/InfoText/Text";
import {CustomLink} from "../../components/common/CustomLink";

export const ColorLink = ({ color, onClick, isActive }) => {
  const bgColor = extractColorFromUrl(color.thumbnailUrl);

  return (
    <li>
      <CustomLink
        style={{ backgroundColor: `#${bgColor}` }}
        href={color.thumbnailUrl}
        onClick={onClick}
        className={isActive ? "active" : ""}
      >
        <Text style={{ visibility: "hidden" }} text={color.title} />
      </CustomLink>
    </li>
  );
};
