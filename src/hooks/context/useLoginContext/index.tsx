/* eslint-disable no-unused-vars */
import { createContext, ReactNode, useContext, useState } from "react";

const initialLogin = {
  user: "",
  password: "",
};

interface IContext {
  data: typeof initialLogin;
  setUser: (user: string) => void;
  setPassword: (password: string) => void;
}

const noOp = () => {
  throw new Error("Function must be implemented in the Provider.");
};

export const LoginContext = createContext<IContext>({
  data: initialLogin,
  setUser: noOp,
  setPassword: noOp,
});

export const useLoginContext = () => {
  return useContext(LoginContext);
};

interface IProvider {
  children: ReactNode;
}

export const LoginProvider = ({ children }: IProvider) => {
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

  const contextValue: IContext = {
    data: data,
    setUser: setUser,
    setPassword: setPassword,
  };

  return (
    <LoginContext.Provider value={contextValue}>
      {children}
    </LoginContext.Provider>
  );
};
