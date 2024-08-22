/* eslint-disable no-unused-vars */
import { createContext, ReactNode, useContext, useState } from "react";

const initialStatus = {
  status: "",
  situacao: "",
};

interface IContext {
  data: typeof initialStatus;
  setStatus: (status: string) => void;
  setSituacao: (situacao: string) => void;
}

const noOp = () => {
  throw new Error("Function must be implemented in the Provider.");
};

export const StatusContext = createContext<IContext>({
  data: initialStatus,
  setStatus: noOp,
  setSituacao: noOp,
});

export const useStatusContext = () => {
  return useContext(StatusContext);
};

interface IProvider {
  children: ReactNode;
}

export const StatusProvider = ({ children }: IProvider) => {
  const [data, setData] = useState(initialStatus);

  const setStatus = (status: string) => {
    setData((prevState) => ({
      ...prevState,
      status: status,
    }));
  };

  const setSituacao = (situacao: string) => {
    setData((prevState) => ({
      ...prevState,
      situacao: situacao,
    }));
  };

  const contextValue: IContext = {
    data: data,
    setStatus: setStatus,
    setSituacao: setSituacao,
  };

  return (
    <StatusContext.Provider value={contextValue}>
      {children}
    </StatusContext.Provider>
  );
};
