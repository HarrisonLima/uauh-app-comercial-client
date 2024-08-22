import { createContext, useContext, useState } from "react";

const initialUsuario = {
  perfilAcesso: "",
  usuario: "",
  senha: "",
  nome: "",
  situacao: "",
};

export const UsuarioContext = createContext<{
  data: typeof initialUsuario;
  setPerfilAcesso: (perfilAcesso: string) => void;
  setUsuario: (usuario: string) => void;
  setSenha: (senha: string) => void;
  setNome: (nome: string) => void;
  setSituacao: (situacao: string) => void;
}>({
  data: initialUsuario,
  setPerfilAcesso: () => {},
  setUsuario: () => {},
  setSenha: () => {},
  setNome: () => {},
  setSituacao: () => {},
});

export const useUsuarioContext = () => {
  return useContext(UsuarioContext);
};

export const UsuarioProvider = ({ children }: any) => {
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

  const dataContext = {
    data: data,
    setPerfilAcesso: setPerfilAcesso,
    setUsuario: setUsuario,
    setSenha: setSenha,
    setNome: setNome,
    setSituacao: setSituacao,
  };

  return (
    <UsuarioContext.Provider value={dataContext}>
      {children}
    </UsuarioContext.Provider>
  );
};
