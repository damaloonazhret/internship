import { forwardRef, useImperativeHandle, useRef } from "react";

export const Input = forwardRef((props, ref) => {
  const inputRef = useRef(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        focus() {
          inputRef.current.focus();
        },
        getValue() {
          return inputRef.current.value;
        },
        setValue(newValue) {
          inputRef.current.value = newValue;
        },
      };
    },
    [],
  );

  return <input ref={inputRef} {...props} />;
});
