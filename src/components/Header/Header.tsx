import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { checkValidate } from "../../services/validate/checkUserName";
import {
  getUserInfo,
  getUserInfoAsync,
} from "../../services/api/github/getData";
import { InputWithError } from "../common/Input/InputWithError";
import { useAsyncRequest } from "../../services/hooks/useAsyncRequest";
import { useDebounce } from "../../services/hooks/useDebounce";
import { DEBOUNCE_DELAY } from "../constants/constants";
import { useLocation, useNavigate } from "react-router-dom";
import { RefObjectWithValue } from "../common/Input/Input";
import {
  RenderRequest,
  SetIsLoadingRequest,
  SetStateRequest,
} from "../common/GitHub/Request";
import { GithubData } from "../Main/Main";

interface HeaderProps {
  setState: SetStateRequest;
  render: RenderRequest;
  setIsLoading: SetIsLoadingRequest;
}

export const Header: FC<HeaderProps> = ({ setState, render, setIsLoading }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const title = pathname.charAt(1).toUpperCase() + pathname.slice(2);
  const userNameRef = useRef<RefObjectWithValue>(null);
  const [userName, setUserName] = useState<string>("");
  const debouncedValue = useDebounce(userName, DEBOUNCE_DELAY);
  const { isLoading, error, data, setError, fetchData } =
    useAsyncRequest<GithubData>();

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

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading, setIsLoading]);

  const setRepos = useCallback(
    async (value: string) => {
      const isChecked = checkValidate(value);
      if (isChecked.validate) {
        await fetchData(
          pathname === "/async" ? getUserInfoAsync : getUserInfo,
          value,
        );
        const params = new URLSearchParams();
        params.append("query", value);
        navigate({
          pathname: pathname,
          search: params.toString(),
        });
      } else {
        setError(isChecked.error);
      }
    },
    [setError, navigate, pathname, fetchData],
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
            error={error instanceof Error ? error.message : error}
            onChange={handleInputChange}
          />
        </div>
      </form>
    </header>
  );
};
