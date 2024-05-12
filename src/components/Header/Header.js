import { useCallback, useEffect, useRef, useState } from "react";
import { InputWithError } from "../common/InputWithError";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom";
import {useAsyncRequest} from "../../services/hooks/useAsyncRequest";
import {checkUserName} from "../../services/validate/userName";
import {getUserInfo, getUserInfoAsync} from "../../services/api/getData";

export const Header = ({ setState, render }) => {
  const history = useHistory();
  const location = useLocation();
  const pathName = location.pathname;
  const pageName = pathName.charAt(1).toUpperCase() + pathName.slice(2);
  const userNameRef = useRef("");
  const [userName, setUserName] = useState("");
  const { isLoading, error, data, setError, fetchData } = useAsyncRequest();

  useEffect(() => {
    if (data && data.userInfoMy && data.userRepoMy) {
      switch (pathName) {
        case "/async":
          setState(data);
          break;
        case "/promise":
          setState(data);
          break;
        default:
          break;
      }
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
    const currentUserName = userNameRef.current;
    const isChecked = checkUserName(currentUserName);

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

  const setNameValue = useCallback((value) => {
    setUserName(value);
  }, []);

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
            error={error}
            value={userName}
            setRef={(value) => (userNameRef.current = value)}
            onChange={(value) => setNameValue(value)}
            debounceTime={300}
          />
          <div id="preloader" className={isLoading ? "loader" : null} />
        </div>
      </form>
    </header>
  );
};
