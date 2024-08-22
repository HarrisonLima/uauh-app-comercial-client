/* eslint-disable no-unused-vars */
import { createContext, ReactNode, useContext, useState } from "react";

const initialUsuario = {
  perfilAcesso: "",
  usuario: "",
  senha: "",
  nome: "",
  situacao: "",
};

interface IContext {
  data: typeof initialUsuario;
  setPerfilAcesso: (perfilAcesso: string) => void;
  setUsuario: (usuario: string) => void;
  setSenha: (senha: string) => void;
  setNome: (nome: string) => void;
  setSituacao: (situacao: string) => void;
}

const noOp = () => {
  throw new Error("Function must be implemented in the Provider.");
};

export const UsuarioContext = createContext<IContext>({
  data: initialUsuario,
  setPerfilAcesso: noOp,
  setUsuario: noOp,
  setSenha: noOp,
  setNome: noOp,
  setSituacao: noOp,
});

export const useUsuarioContext = () => {
  return useContext(UsuarioContext);
};

interface IProvider {
  children: ReactNode;
}

export const UsuarioProvider = ({ children }: IProvider) => {
  const [data, setData] = useState(initialUsuario);

  const setPerfilAcesso = (perfilAcesso: string) => {
    setData((prevState) => ({
      ...prevState,
      perfilAcesso: perfilAcesso,
    }));
  };

  const setUsuario = (usuario: string) => {
    setData((prevState) => ({
      ...prevState,
      usuario: usuario,
    }));
  };

  const setSenha = (senha: string) => {
    setData((prevState) => ({
      ...prevState,
      senha: senha,
    }));
  };

  const setNome = (nome: string) => {
    setData((prevState) => ({
      ...prevState,
      nome: nome,
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
    setUsuario: setUsuario,
    setSenha: setSenha,
    setNome: setNome,
    setSituacao: setSituacao,
  };

  return (
    <UsuarioContext.Provider value={contextValue}>
      {children}
    </UsuarioContext.Provider>
  );
};
