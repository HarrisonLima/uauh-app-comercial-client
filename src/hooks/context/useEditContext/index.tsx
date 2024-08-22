import { createContext, useContext, useState } from "react";

const initialEdit = {
  rowData: [] as any[],
};

export const EditContext = createContext<{
  rowData: typeof initialEdit;
  setRowData: (rowData: []) => void;
}>({
  rowData: initialEdit,
  setRowData: () => {},
});

export const useEditContext = () => {
  return useContext(EditContext);
};

export const EditProvider = ({ children }: any) => {
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
