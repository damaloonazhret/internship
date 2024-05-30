import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  FC,
  ChangeEvent
} from "react";
import { checkValidate } from "../../services/validate/checkUserName";
import { getUserInfo, getUserInfoAsync } from "../../services/api/getData";
import { InputWithError } from "../common/Input/InputWithError";
import { useAsyncRequest } from "../../services/hooks/useAsyncRequest";
import { useDebounce } from "../../services/hooks/useDebounce";
import { DEBOUNCE_DELAY } from "../constants/constants";
import { Preloader } from "../common/Loaders/Preloader";
import { useHistory, useLocation } from "react-router-dom";
import {RefObjectWithValue} from "../common/Input/Input";

interface HeaderProps {
  setState: (data: any) => void;
  render: (title: string) => JSX.Element;
}

export const Header: FC<HeaderProps> = ({ setState, render }) => {
  const history = useHistory();
  const location = useLocation();
  const pathname = location.pathname;
  const title = pathname.charAt(1).toUpperCase() + pathname.slice(2);
  const userNameRef = useRef<RefObjectWithValue>(null);
  const [userName, setUserName] = useState<string>("");
  const debouncedValue = useDebounce(userName, DEBOUNCE_DELAY);
  const { isLoading, error, data, setError, fetchData } = useAsyncRequest();

  useEffect(() => {
    if (data && data.userInfoData && data.userRepoData) {
      setState(data);
    }
  }, [data, pathname, setState]);

  useLayoutEffect(() => {
    if (userNameRef.current) {
      userNameRef.current.focus();
    }
  }, []);

  const setRepos = useCallback(
    async (value: string) => {
      const isChecked = checkValidate(value);
      if (isChecked.validate) {
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
          setError((err as Error).message);
        }
      } else {
        setError(isChecked.error);
      }
    },
    [setError, history, pathname, fetchData],
  );

  useEffect(() => {
    setRepos(debouncedValue);
  }, [setRepos, debouncedValue]);

  const setNameValue = useCallback(
    (value: string) => {
      setUserName(value);
    },
    [setUserName],
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
  };

  return (
    <header className="header">
      <form onSubmit={(e) => e.preventDefault()}>
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
            onChange={handleInputChange}
          />
          <Preloader isLoading={isLoading} />
        </div>
      </form>
    </header>
  );
};
