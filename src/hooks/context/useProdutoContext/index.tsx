import { createContext, useContext, useState } from "react";

const initialProduto = {
  produto: "",
  situacao: "",
};

export const ProdutoContext = createContext<{
  data: typeof initialProduto;
  setProduto: (produto: string) => void;
  setSituacao: (situacao: string) => void;
}>({
  data: initialProduto,
  setProduto: () => {},
  setSituacao: () => {},
});

export const useProdutoContext = () => {
  return useContext(ProdutoContext);
};

export const ProdutoProvider = ({ children }: any) => {
  const [data, setData] = useState(initialProduto);

  const setProduto = (produto: string) => {
    setData((prevState) => ({
      ...prevState,
      produto: produto,
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
    setProduto: setProduto,
    setSituacao: setSituacao,
  };

  return (
    <ProdutoContext.Provider value={dataContext}>
      {children}
    </ProdutoContext.Provider>
  );
};
