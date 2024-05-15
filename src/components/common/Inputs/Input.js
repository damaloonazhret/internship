import { forwardRef } from "react";

export const Input = forwardRef((props, ref) => {
  const { value, checkError, ...rest } = props;

  return <input {...rest} ref={ref} value={value} />;
});
