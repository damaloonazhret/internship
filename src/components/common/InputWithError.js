import { Text } from "./Text";
import { Input } from "./Input";

export const InputWithError = (props) => {
  return (
    <>
      <Input {...props} />
      {props.error && <Text className="error" text={props.error} />}
    </>
  );
};
