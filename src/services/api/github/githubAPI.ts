import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserInfo, UserRepo } from "./api";

const token = process.env.REACT_APP_TOKEN;

const githubAPI = createApi({
  reducerPath: "githubAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.github.com/",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    fetchUserInfo: build.query<UserInfo, string>({
      query: (username) => `users/${username}`,
    }),
    fetchUserRepos: build.query<UserRepo[], string>({
      query: (username) => `users/${username}/repos`,
    }),
  }),
});

export default githubAPI;
