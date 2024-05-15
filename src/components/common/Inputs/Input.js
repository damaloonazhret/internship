import { forwardRef } from "react";

export const Input = forwardRef((props, ref) => {
  const { onChange, value, ...rest } = props;

  return <input {...rest} ref={ref} value={value} onChange={(e) => onChange(e.target.value)} />;
});
