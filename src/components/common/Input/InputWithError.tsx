import { Text } from "../InfoText/Text";
import {Input, RefObjectWithValue} from "./Input";
import { forwardRef, InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error: Error | null | string;
}

export const InputWithError = forwardRef<RefObjectWithValue, InputProps>(
  (props, ref) => {
    const { error, value, ...rest } = props;

    return (
      <>
        <Input ref={ref} {...rest} />
        {error && <Text className="error" text={String(error)} />}
      </>
    );
  },
);
