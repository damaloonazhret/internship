import {
  forwardRef,
  InputHTMLAttributes,
  useImperativeHandle,
  useRef,
} from "react";

export interface RefObjectWithValue {
  getValue(): string;

  focus(): void;

  setValue(value: string): void;

  value?: string;
}

export const Input = forwardRef<
  RefObjectWithValue,
  InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        focus() {
          inputRef.current?.focus();
        },
        getValue() {
          return inputRef.current?.value || "";
        },
        setValue(newValue: string) {
          if (inputRef.current) {
            inputRef.current.value = newValue;
          }
        },
      };
    },
    [],
  );

  return <input ref={inputRef} {...props} />;
});
