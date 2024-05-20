import {extractColorFromUrl} from "../../services/colors/extractColorFromUrl";

export const ColorLink = ({ color, onClick, isActive }) => {
  const bgColor = extractColorFromUrl(color.thumbnailUrl);

  return (
    <li>
      <a
        style={{
          backgroundColor: `#${bgColor}`,
        }}
        href={color.thumbnailUrl}
        rel="noreferrer"
        target="_blank"
        onClick={onClick}
        className={isActive ? "active" : ""}
      >
        <span style={{ visibility: "hidden" }}>{color.title}</span>
      </a>
    </li>
  );
};

