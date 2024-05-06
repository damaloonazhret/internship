import { memo, useEffect } from "react";
import { checkValidate } from "../../services/validate";
import style from "./header.module.scss";
import Preloader from "../Preloaders/Preloader";
import { useAsyncRequest } from "../hooks/useAsyncRequest";
import { getUserInfo, getUserInfoAsync } from "../../services/getData";
import { useLocation } from "react-router-dom";

const Header = ({
  asyncInputValue,
  promiseInputValue,
  setAsyncInputValue,
  setPromiseInputValue,
  setAsync,
  setPromise,
}) => {
  const { isLoading, error, data, setError, fetchData } = useAsyncRequest();

  const location = useLocation();
  const pathname = location.pathname;
  const name = pathname.charAt(1).toUpperCase() + pathname.slice(2);

  useEffect(() => {
    setError("");
  }, [asyncInputValue, promiseInputValue, setError]);

  useEffect(() => {
    if (data && data.userInfoMy && data.userRepoMy) {
      switch (pathname) {
        case "/fetch":
          setAsync(data);
          break;
        case "/promise":
          setPromise(data);
          break;
        default:
          break;
      }
    }
  }, [data, pathname, setAsync, setPromise]);

  const setRepos = async (e) => {
    e.preventDefault();

    let value;
    pathname === "/fetch"
      ? (value = asyncInputValue)
      : (value = promiseInputValue);
    console.log(value)
    console.log(asyncInputValue)
    const isChecked = checkValidate(value);

    if (isChecked.check) {
      try {
        await fetchData(
          pathname === "/fetch" ? getUserInfoAsync : getUserInfo,
          value,
        );
      } catch (err) {
        setError(err.message);
      }
    } else {
      setError(isChecked.message);
    }
  };

  const setName = (e) => {
    const newName = e.target.value;

    if (pathname === "/fetch") setAsyncInputValue(newName);
    if (pathname === "/promise") setPromiseInputValue(newName);
  };

  return (
    <header className={style.header}>
      <form onSubmit={(e) => setRepos(e)}>
        <p id="head-info">{`${name} Request`}</p>
        <div className={style.search}>
          <input
            id="url"
            className={style.url}
            placeholder="Write GitHub NickName..."
            name="url"
            type="search"
            list="names"
            value={pathname === "/fetch" ? asyncInputValue : promiseInputValue}
            onChange={setName}
          />
          <datalist id="names"></datalist>
          {error && <span className={style.error}>{error}</span>}
          <Preloader isLoading={isLoading} />
        </div>
      </form>
    </header>
  );
};

export default memo(Header);
