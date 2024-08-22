/* eslint-disable no-unused-vars */
import { createContext, ReactNode, useContext, useState } from "react";

const initialResetPass = {
  id: 0,
  password: "",
  reseted: false,
};

interface IContext {
  dataResetPass: typeof initialResetPass;
  setId: (id: number) => void;
  setPassword: (password: string) => void;
  setReset: (reseted: boolean) => void;
}

const noOp = () => {
  throw new Error("Function must be implemented in the Provider.");
};

export const ResetPassContext = createContext<IContext>({
  dataResetPass: initialResetPass,
  setId: noOp,
  setPassword: noOp,
  setReset: noOp,
});

export const useResetPassContext = () => {
  return useContext(ResetPassContext);
};

interface IProvider {
  children: ReactNode;
}

export const ResetPassProvider = ({ children }: IProvider) => {
  const [dataResetPass, setDataResetPass] = useState(initialResetPass);

  const setId = (id: number) => {
    setDataResetPass((prevState) => ({
      ...prevState,
      id: id,
    }));
  };

  const setPassword = (password: string) => {
    setDataResetPass((prevState) => ({
      ...prevState,
      password: password,
    }));
  };

  const setReset = (reseted: boolean) => {
    setDataResetPass((prevState) => ({
      ...prevState,
      reseted: reseted,
    }));
  };

  const contextValue: IContext = {
    dataResetPass: dataResetPass,
    setId: setId,
    setPassword: setPassword,
    setReset: setReset,
  };

  return (
    <ResetPassContext.Provider value={contextValue}>
      {children}
    </ResetPassContext.Provider>
  );
};
