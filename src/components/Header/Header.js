import { useState } from "react";
import { checkValidate } from "../../services/validate";
import { getUserInfo, getUserInfoAsync } from "../../services/getData";
import style from './header.module.scss'

const Header = (props) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const setRepos = async (e) => {
    e.preventDefault();

    const path = props.pathname;
    const value = props.inputValue;
    const isChecked = checkValidate(value);

    if (isChecked.check) {
      setIsLoading(true);

      try {
        let data;
        switch (path) {
          case "/fetch":
            data = await getUserInfoAsync(value);
            props.setAsyncState(data);
            break;

          case "/promise":
            data = await getUserInfo(value);
            props.setPromiseState(data);
            break;

          default:
            break;
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setError("");
        setIsLoading(false);
      }
    } else {
      setError(isChecked.message);
    }
  };

  const setName = (e) => {
    const newName = e.target.value;
    const path = props.pathname;
    if (path === "/fetch") {
      props.setAsyncInputValue(newName);
    }
    if (path === "/promise") {
      props.setPromiseInputValue(newName);
    }
  };

  return (
    <header className={style.header}>
      <form onSubmit={(e) => setRepos(e)}>
        <p id="head-info">{`${props.name} Request`}</p>
        <div className={style.search}>
          <input
            id="url"
            className={style.url}
            placeholder="Write GitHub NickName..."
            name="url"
            type="search"
            list="names"
            value={props.inputValue}
            onChange={setName}
          />
          <datalist id="names"></datalist>
          <span className={style.error}>{error}</span>
          <div  className={`${style.preloader} ${isLoading ? "loader" : null}`}></div>
        </div>
      </form>
    </header>
  );
};

export default Header;
