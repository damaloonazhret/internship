import { Text } from "../InfoText/Text";
import { Input } from "./Input";
import { forwardRef } from 'react';

export const InputWithError = forwardRef((props, ref) => {
  const { error, value, ...rest } = props;

  return (
    <>
      <Input value={value} ref={ref} {...rest} />
      {error && <Text className="error" text={error} />}
    </>
  );
});
