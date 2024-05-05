import {memo, useEffect} from "react";
import { checkValidate } from "../../services/validate";
import style from "./header.module.scss";
import Preloader from "../Preloaders/Preloader";
import { useAsyncRequest } from "../hooks/useAsyncRequest";
import { getUserInfo, getUserInfoAsync } from "../../services/getData";

const Header = ({
  name,
  pathname,
  inputValue,
  setAsyncInputValue,
  setPromiseInputValue,
  setAsyncState,
  setPromiseState,
}) => {
  const { isLoading, error, data, setError, fetchData } = useAsyncRequest();

  useEffect(() => {
    setError("");
  }, [inputValue, setError]);

  useEffect(() => {
    if (data && data.userInfoMy && data.userRepoMy) {
      switch (pathname) {
        case "/fetch":
          setAsyncState(data);
          break;
        case "/promise":
          setPromiseState(data);
          break;
        default:
          break;
      }
    }
  }, [data, pathname, setAsyncState, setPromiseState]);

  const setRepos = async (e) => {
    e.preventDefault();

    const path = pathname;
    const value = inputValue;
    const isChecked = checkValidate(value);

    if (isChecked.check) {
      try {
        await fetchData(
          path === "/fetch" ? getUserInfoAsync : getUserInfo,
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
            value={inputValue}
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
