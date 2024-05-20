import {useCallback, useEffect, useLayoutEffect, useRef, useState} from "react";
import { checkValidate } from "../../services/validate/checkUserName";
import { getUserInfo, getUserInfoAsync } from "../../services/api/getData";
import { InputWithError } from "../common/Input/InputWithError";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom";
import { useAsyncRequest } from "../../services/hooks/useAsyncRequest";
import { useDebounce } from "../../services/hooks/useDebounce";
import { DEBOUNCE_DELAY } from "../constants/constants";

export const Header = ({ setState, render }) => {
  const history = useHistory();
  const location = useLocation();
  const pathname = location.pathname;
  const title = pathname.charAt(1).toUpperCase() + pathname.slice(2);
  const userNameRef = useRef(null);
  const [userName, setUserName] = useState("");
  const debouncedValue = useDebounce(userName, DEBOUNCE_DELAY);
  const { isLoading, error, data, setError, fetchData } = useAsyncRequest();

  useEffect(() => {
    if (data && data.userInfoMy && data.userRepoMy) {
      setState(data);
    }
  }, [data, pathname, setState]);

  useLayoutEffect(() => {
    userNameRef.current.focus();
  }, []);

  const setRepos = useCallback(
    async (value) => {
      const isChecked = checkValidate(value);
      if (isChecked.check) {
        try {
          await fetchData(
            pathname === "/async" ? getUserInfoAsync : getUserInfo,
            value,
          );
          const params = new URLSearchParams();
          params.append("query", value);
          history.push({
            pathname: pathname,
            search: params.toString(),
          });
          setError("");
        } catch (err) {
          setError(err.message);
        }
      } else {
        setError(isChecked.message);
      }
    },
    [setError, history, pathname, fetchData],
  );

  useEffect(() => {
    setRepos(debouncedValue);
  }, [setRepos, debouncedValue]);

  const setNameValue = useCallback(
    (value) => {
      setUserName(value);
    },
    [setUserName],
  );

  return (
    <header className="header">
      <form onSubmit={(e) => (e.preventDefault())}>
        {render(`${title} page`)}
        <div className="search">
          <datalist id="names" />
          <InputWithError
            id="url"
            className="url"
            placeholder="Write GitHub NickName..."
            name="url"
            type="search"
            list="names"
            ref={userNameRef}
            value={userName}
            error={error}
            onChange={(e) => setNameValue(e.target.value)}
          />
          <div id="preloader" className={isLoading ? "loader" : null} />
        </div>
      </form>
    </header>
  );
};
