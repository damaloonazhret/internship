export const Title = ({
  type: Tag = "h2",
  title,
  id = "page-title",
  ...props
}) => {
  return (
    <Tag id={id} {...props}>
      {title}
    </Tag>
  );
};
