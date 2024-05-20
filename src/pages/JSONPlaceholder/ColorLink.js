export const ColorLink = ({ color, onClick, isActive }) => {
  return (
    <li>
      <a
        style={{
          backgroundColor: `#${color.thumbnailUrl.substring(color.thumbnailUrl.lastIndexOf("/") + 1)}`,
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
