import { Text } from "../InfoText/Text";
import { Input } from "./Input";
import { forwardRef } from 'react';

export const InputWithError = forwardRef((props, ref) => {
  const { onChange, error, value, ...rest } = props;
  return (
    <>
      <Input onChange={onChange} value={value} ref={ref} {...rest} />
      {error && <Text className="error" text={error} />}
    </>
  );
});
