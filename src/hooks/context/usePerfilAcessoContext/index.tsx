/* eslint-disable no-unused-vars */
import { createContext, ReactNode, useContext, useState } from "react";

const initialPerfilAcesso = {
  perfilAcesso: "",
  situacao: "",
};

interface IContext {
  data: typeof initialPerfilAcesso;
  setPerfilAcesso: (perfilAcesso: string) => void;
  setSituacao: (situacao: string) => void;
}

const noOp = () => {
  throw new Error("Function must be implemented in the Provider.");
};

export const PerfilAcessoContext = createContext<IContext>({
  data: initialPerfilAcesso,
  setPerfilAcesso: noOp,
  setSituacao: noOp,
});

export const usePerfilAcessoContext = () => {
  return useContext(PerfilAcessoContext);
};

interface IProvider {
  children: ReactNode;
}

export const PerfilAcessoProvider = ({ children }: IProvider) => {
  const [data, setData] = useState(initialPerfilAcesso);

  const setPerfilAcesso = (perfilAcesso: string) => {
    setData((prevState) => ({
      ...prevState,
      perfilAcesso: perfilAcesso,
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
    setPerfilAcesso: setPerfilAcesso,
    setSituacao: setSituacao,
  };

  return (
    <PerfilAcessoContext.Provider value={contextValue}>
      {children}
    </PerfilAcessoContext.Provider>
  );
};
