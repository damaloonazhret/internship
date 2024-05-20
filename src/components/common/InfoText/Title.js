import { memo } from "react";

export const Title = memo(function Title({
  type: Tag = "h2",
  title,
  id = "page-title",
  ...props
}) {
  return (
    <Tag id={id} {...props}>
      {title}
    </Tag>
  );
});
