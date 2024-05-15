import { Header } from "../../Header/Header";
import {GitHubInfo} from "./GitHubInfo";
import {Title} from "../InfoText/Title";

export const Request = ({ state, setState, title, render }) => {
  let info = state.userInfoMy;
  let repo = state.userRepoMy;

  return (
    <>
      <Header setState={setState} render={render} />
      {info && repo ? <GitHubInfo userInfo={info} userRepo={repo}/> : <Title title={title}/>}
    </>
  );
};
