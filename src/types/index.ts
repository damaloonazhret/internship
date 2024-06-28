export interface UserInfo {
  name: string;
  html_url: string;
  avatar_url: string;
  login: string;
  id: number;
  node_id: string;
  url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  company: string;
  blog: string;
  location: string;
  email: string | null;
  hireable: string | null;
  bio: string;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  private_gists: number;
  total_private_repos: number;
  owned_private_repos: number;
  disk_usage: number;
  collaborators: number;
  two_factor_authentication: boolean;
  plan: {
    name: string;
    space: number;
    collaborators: number;
    private_repos: number;
  };
}

export interface UserRepo {
  full_name: string;
  language: string | null;
  visibility: string;
  html_url: string;
  created_at: string;
  name: string;
  id: number;
  node_id: string;
  private: boolean;
  description: string | null;
  fork: boolean;
  url: string;
  updated_at: string;
  pushed_at: string;
}
