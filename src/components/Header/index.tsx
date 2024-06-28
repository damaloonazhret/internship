import {ChangeEvent, FC, useCallback, useEffect, useRef, useState,} from "react";
import {checkValidate} from "services/validate/checkUserName";
import {InputWithError} from "../common/Input/InputWithError";
import {useDebounce} from "services/hooks/useDebounce";
import {DEBOUNCE_DELAY} from "components/constants";
import {useLocation, useNavigate} from "react-router-dom";
import {RefObjectWithValue} from "../common/Input/Input";
import {Title} from "../common/InfoText/Title";
import {useAppDispatch,} from "services/hooks/redux/redux";
import {fetchUserByName} from "features/github/githubSlice";

interface HeaderProps {
  msg: string;
  isError: boolean;
}

export const Header: FC<HeaderProps> = ({msg, isError}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const title = pathname.charAt(1).toUpperCase() + pathname.slice(2);
  const userNameRef = useRef<RefObjectWithValue>(null);
  const [userNameL, setUserLName] = useState<string>("");
  const dispatch = useAppDispatch();
  const debouncedValue = useDebounce(userNameL, DEBOUNCE_DELAY);
  const [localError, setLocalError] = useState("");

  const setRepos = useCallback(
    async (value: string) => {
      const isChecked = checkValidate(value);
      if (isChecked.validate) {
        const pathname = location.pathname;
        dispatch(fetchUserByName(value));
        const params = new URLSearchParams();
        params.append("query", value);
        navigate({
          pathname: pathname,
          search: params.toString(),
        });
      } else {
        setLocalError(isChecked.error);
      }
    },
    [dispatch, location.pathname, navigate],
  );

  useEffect(() => {
    setRepos(debouncedValue);
  }, [setRepos, debouncedValue]);

  const setNameValue = useCallback(
    (value: string) => {
      setUserLName(value);
    },
    [setUserLName],
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
  };

  return (
    <header className="header">
      <form onSubmit={(e) => e.preventDefault()}>
        <Title title={`${title} page`}/>
        <div className="search">
          <datalist id="names"/>
          <InputWithError
            id="url"
            className="url"
            placeholder="Write GitHub NickName..."
            name="url"
            type="search"
            list="names"
            ref={userNameRef}
            value={userNameL}
            error={localError ? localError : isError && msg}
            onChange={handleInputChange}
          />
        </div>
      </form>
    </header>
  );
};
