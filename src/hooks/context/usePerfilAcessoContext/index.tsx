import { createContext, useContext, useState } from "react";

const initialPerfilAcesso = {
  perfilAcesso: "",
  situacao: "",
};

export const PerfilAcessoContext = createContext<{
  data: typeof initialPerfilAcesso;
  setPerfilAcesso: (perfilAcesso: string) => void;
  setSituacao: (situacao: string) => void;
}>({
  data: initialPerfilAcesso,
  setPerfilAcesso: () => {},
  setSituacao: () => {},
});

export const usePerfilAcessoContext = () => {
  return useContext(PerfilAcessoContext);
};

export const PerfilAcessoProvider = ({ children }: any) => {
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

  const dataContext = {
    data: data,
    setPerfilAcesso: setPerfilAcesso,
    setSituacao: setSituacao,
  };

  return (
    <PerfilAcessoContext.Provider value={dataContext}>
      {children}
    </PerfilAcessoContext.Provider>
  );
};
