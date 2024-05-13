import { Header } from "../../components/Header/Header";
import {createCards} from "../../services/create/createCards";
import {createTitle} from "../../services/create/createTitle";

export const Request = ({ state, setState, title, render }) => {
  let info = state.userInfoMy;
  let repo = state.userRepoMy;

  return (
    <>
      <Header setState={setState} render={render} />
      {info && repo ? createCards("", info, repo) : createTitle(title)}
    </>
  );
};
