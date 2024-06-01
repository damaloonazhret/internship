import {
  ChangeEvent,
  FormEvent,
  FC,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Text } from "../../components/common/InfoText/Text";
import { InputWithError } from "../../components/common/Input/InputWithError";
import { setCookie } from "../../services/cookie/setCookie";
import { checkUserPass } from "../../services/validate/checkUserPass";
import { RefObjectWithValue } from "../../components/common/Input/Input";

export interface ValidateProps {
  setIsAuth: (auth: boolean) => void;
}

const Validate: FC<ValidateProps> = (props) => {
  const passwordRef = useRef<RefObjectWithValue>(null);
  const [error, setError] = useState("");
  const [userPass, setUserPass] = useState("");

  const checkPass = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentPassword = passwordRef.current
      ? passwordRef.current.getValue()
      : "";
    const passCheck = checkUserPass(currentPassword);
    if (passCheck.validate) {
      props.setIsAuth(true);
      setCookie("admin", "true", 1);
    } else {
      setError(passCheck.error);
    }
  };

  useLayoutEffect(() => {
    if (passwordRef.current) passwordRef.current.focus();
  }, []);

  const setPass = useCallback((value: string) => {
    setUserPass(value);
  }, []);

  return (
    <form className="validate" onSubmit={checkPass}>
      <Text
        className="validate__info"
        text="To access the settings, enter the administrator password"
      />
      <InputWithError
        id="pass"
        className="validate__password"
        placeholder="Type password..."
        name="password"
        type="password"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setPass(e.target.value)}
        error={error}
        value={userPass}
        ref={passwordRef}
      />
    </form>
  );
};

export default Validate;
