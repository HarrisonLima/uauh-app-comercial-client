/* eslint-disable no-unused-vars */
import { createContext, ReactNode, useContext, useState } from "react";

const initialProduto = {
  produto: "",
  situacao: "",
};

interface IContext {
  data: typeof initialProduto;
  setProduto: (produto: string) => void;
  setSituacao: (situacao: string) => void;
}

const noOp = () => {
  throw new Error("Function must be implemented in the Provider.");
};

export const ProdutoContext = createContext<IContext>({
  data: initialProduto,
  setProduto: noOp,
  setSituacao: noOp,
});

export const useProdutoContext = () => {
  return useContext(ProdutoContext);
};

interface IProvider {
  children: ReactNode;
}

export const ProdutoProvider = ({ children }: IProvider) => {
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

  const contextValue: IContext = {
    data: data,
    setProduto: setProduto,
    setSituacao: setSituacao,
  };

  return (
    <ProdutoContext.Provider value={contextValue}>
      {children}
    </ProdutoContext.Provider>
  );
};
