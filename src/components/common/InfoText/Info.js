export const Info = ({
  type: Tag = "h2",
  title,
  subtitle,
  id = "page-title",
  ...props
}) => {
  return (
    <Tag id={id} {...props}>
      {title} {subtitle && <span>{subtitle}</span>}
    </Tag>
  );
};
