const Routes = {
  home: "/",
  logout: "/logout",
  users: "/users",
  user: (id: string) => `/users/${id}`,
  authFailure: "/auth/failure",
  posts: "/posts",
  post: (id: string) => `/posts/${id}`,
  newPost: "/posts/new",
  reply: (id: string) => `/posts/${id}/reply`,
  termOfService: "/termOfService",
  privacyPolicy: "/privacyPolicy",
  contact: "/contact",
};

export default Routes;
