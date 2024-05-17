import { useCallback, useEffect, useRef, useState } from "react";
import { checkValidate } from "../../services/validate/checkUserName";
import { getUserInfo, getUserInfoAsync } from "../../services/getData";
import { InputWithError } from "../common/Input/InputWithError";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom";
import { useAsyncRequest } from "../../services/hooks/useAsyncRequest";
import { useDebounce } from "../../services/hooks/useDebounce";
import { DEBOUNCE_DELAY } from "../constants/constants";

export const Header = ({ setState, render }) => {
  const history = useHistory();
  const location = useLocation();
  const pathName = location.pathname;
  const title = pathName.charAt(1).toUpperCase() + pathName.slice(2);
  const userNameRef = useRef(null);
  const [userName, setUserName] = useState("");
  const debouncedValue = useDebounce(userName, DEBOUNCE_DELAY);
  const { isLoading, error, data, setError, fetchData } = useAsyncRequest();

  useEffect(() => {
    if (data && data.userInfoMy && data.userRepoMy) {
      setState(data);
    }
  }, [data, pathName, setState]);

  const setRepos = useCallback(
    async (value) => {
      const isChecked = checkValidate(value);
      if (isChecked.check) {
        try {
          await fetchData(
            pathName === "/async" ? getUserInfoAsync : getUserInfo,
            value,
          );
          const params = new URLSearchParams();
          params.append("query", value);
          history.push({
            pathname: pathName,
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
    [setError, history, pathName, fetchData],
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
      <form>
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
