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
        async typeText(text) {
          inputRef.current.focus();
          await typeText(inputRef.current, text);
          await deleteText(inputRef.current, text.length);
        },
      };
    },
    [],
  );

  const typeText = (input, text) => {
    return new Promise((resolve) => {
      let index = 0;
      const intervalId = setInterval(() => {
        input.value += text[index];
        index++;
        if (index === text.length) {
          clearInterval(intervalId);
          resolve();
        }
      }, 100);
    });
  };

  const deleteText = (input, length) => {
    return new Promise((resolve) => {
      let index = length;
      const intervalId = setInterval(() => {
        input.value = input.value.slice(0, -1);
        index--;
        if (index === 0) {
          clearInterval(intervalId);
          resolve();
        }
      }, 100);
    });
  };

  return <input ref={inputRef} {...props} />;
});
