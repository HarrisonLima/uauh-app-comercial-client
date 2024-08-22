import { createContext, useContext, useState } from "react";

const initialLogin = {
  user: "",
  password: "",
};

export const LoginContext = createContext<{
  data: typeof initialLogin;
  setUser: (user: string) => void;
  setPassword: (password: string) => void;
}>({
  data: initialLogin,
  setUser: () => {},
  setPassword: () => {},
});

export const useLoginContext = () => {
  return useContext(LoginContext);
};

export const LoginProvider = ({ children }: any) => {
  const [data, setData] = useState(initialLogin);

  const setUser = (user: string) => {
    setData((prevState) => ({
      ...prevState,
      user: user,
    }));
  };

  const setPassword = (password: string) => {
    setData((prevState) => ({
      ...prevState,
      password: password,
    }));
  };

  const dataContext = {
    data: data,
    setUser: setUser,
    setPassword: setPassword,
  };

  return (
    <LoginContext.Provider value={dataContext}>
      {children}
    </LoginContext.Provider>
  );
};
