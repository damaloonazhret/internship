import { useCallback, useEffect, useRef, useState } from "react";
import { checkValidate } from "../../services/validate/checkUserName";
import { getUserInfo, getUserInfoAsync } from "../../services/getData";
import { InputWithError } from "../common/Inputs/InputWithError";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom";
import { useAsyncRequest } from "../../services/hooks/useAsyncRequest";

export const Header = ({ setState, render }) => {
  const history = useHistory();
  const location = useLocation();
  const pathName = location.pathname;
  const pageName = pathName.charAt(1).toUpperCase() + pathName.slice(2);
  const userNameRef = useRef(null);
  const [userName, setUserName] = useState("");
  const { isLoading, error, data, setError, fetchData } = useAsyncRequest();

  useEffect(() => {
    if (data && data.userInfoMy && data.userRepoMy) {
      setState(data);
    }
  }, [data, pathName, setState]);

  useEffect(() => {
    const clearError = setTimeout(() => {
      setError("");
    }, 7000);

    return () => clearTimeout(clearError);
  }, [error, setError]);

  const setRepos = async (e) => {
    e.preventDefault();
    const currentUserName = userNameRef.current.value;
    const isChecked = checkValidate(currentUserName);

    if (isChecked.check) {
      try {
        await fetchData(
          pathName === "/async" ? getUserInfoAsync : getUserInfo,
          currentUserName,
        );
        const params = new URLSearchParams();
        params.append("query", currentUserName);
        history.push({
          pathname: pathName,
          search: params.toString(),
        });
      } catch (err) {
        setError(err.message);
      }
    } else {
      setError(isChecked.message);
    }
  };

  const setNameValue = useCallback(
    (value) => {
      setUserName(value);
    },
    [setUserName],
  );

  return (
    <header className="header">
      <form onSubmit={(e) => setRepos(e)}>
        {render(pageName)}
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
            onChange={(value) => setNameValue(value)}
          />
          <div id="preloader" className={isLoading ? "loader" : null} />
        </div>
      </form>
    </header>
  );
};
