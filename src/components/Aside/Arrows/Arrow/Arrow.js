export const Arrow = (props) => {
  return (
    <p className={props.className} onClick={props.handleClick}>
      {props.content}
    </p>
  );
};
