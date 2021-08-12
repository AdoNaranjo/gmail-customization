let isAuth = false;

export const set = (auth: boolean) => {
  isAuth = auth;
};

export const get = () => {
  return isAuth;
};
