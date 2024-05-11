import { Header } from "../../components/Header/Header";

export const Request = ({ state, setState, create, title, render }) => {
  let info = state.userInfoMy;
  let repo = state.userRepoMy;

  return (
    <>
      <Header setState={setState} render={render} />
      {info && repo ? create("", info, repo) : create(title)}
    </>
  );
};
