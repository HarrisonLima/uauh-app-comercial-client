/* eslint-disable no-unused-vars */
import { createContext, ReactNode, useContext, useState } from "react";

const initialEdit = {
  rowData: [] as any[],
};

interface IContext {
  rowData: typeof initialEdit;
  setRowData: (rowData: []) => void;
}

const noOp = () => {
  throw new Error("Function must be implemented in the Provider.");
};

export const EditContext = createContext<IContext>({
  rowData: initialEdit,
  setRowData: noOp,
});

export const useEditContext = () => {
  return useContext(EditContext);
};

interface IProvider {
  children: ReactNode;
}

export const EditProvider = ({ children }: IProvider) => {
  const [rowContent, setRowContent] = useState(initialEdit);

  const setRowData = (rowContent: []) => {
    setRowContent((prevState) => ({
      ...prevState,
      rowData: rowContent,
    }));
  };

  const dataContext = {
    rowData: rowContent,
    setRowData: setRowData,
  };

  return (
    <EditContext.Provider value={dataContext}>{children}</EditContext.Provider>
  );
};
