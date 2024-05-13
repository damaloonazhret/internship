import { useCallback, useRef, useState } from "react";
import { Text } from "../../components/common/Text";
import { InputWithError } from "../../components/common/InputWithError";
import {setCookie} from "../../services/cookie/setCookie";
import {checkUserPass} from "../../services/validate/checkUserPass";
import {DEBOUNCE_DELAY} from "../../components/common/constants/constants";

const Validate = (props) => {
  const passwordRef = useRef("");
  const [error, setError] = useState("");
  const [userPass, setUserPass] = useState("");

  const checkPass = (e) => {
    e.preventDefault();
    const currentPassword = passwordRef.current;
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
        onChange={(value) => setPass(value)}
        error={error}
        value={userPass}
        debounceTime={DEBOUNCE_DELAY}
        setRef={(value) => (passwordRef.current = value)}
      />
    </form>
  );
};

export default Validate;
