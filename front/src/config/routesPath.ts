const Routes = {
  home: "/",
  login: "/login",
  users: "/users",
  user: (id: string) => `/users/${id}`,
  authFailure: "/auth/failure",
};

export default Routes;
