import { useCallback, useRef, useState } from "react";
import { Text } from "../../components/common/InfoText/Text";
import { InputWithError } from "../../components/common/Inputs/InputWithError";
import { setCookie } from "../../services/cookie/setCookie";
import { checkUserPass } from "../../services/validate/checkUserPass";

export const Validate = (props) => {
  const passwordRef = useRef(null);
  const [error, setError] = useState("");
  const [userPass, setUserPass] = useState("");

  const checkPass = (e) => {
    e.preventDefault();
    const currentPassword = passwordRef.current.value;
    const passCheck = checkUserPass(currentPassword);
    if (passCheck.validate) {
      props.setAuth(true);
      setCookie("admin", "true", 1);
    } else {
      setError(passCheck.error);
    }
  };

  const setPass = useCallback((value) => {
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
        onChange={(e) => setPass(e.target.value)}
        error={error}
        value={userPass}
        ref={passwordRef}
      />
    </form>
  );
};
