import { useDebounce } from "../../services/hooks/useDebounce";

export const Input = (props) => {
  const { onChange, debounceTime, value, setRef, ...rest } = props;
  const { inputValue, handleChange } = useDebounce(
    onChange,
    debounceTime,
    value,
    setRef,
  );

  return <input {...rest} value={inputValue} onChange={handleChange} />;
};
