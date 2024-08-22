import { createContext, useContext, useState } from "react";

const initialStatus = {
  status: "",
  situacao: "",
};

export const StatusContext = createContext<{
  data: typeof initialStatus;
  setStatus: (status: string) => void;
  setSituacao: (situacao: string) => void;
}>({
  data: initialStatus,
  setStatus: () => {},
  setSituacao: () => {},
});

export const useStatusContext = () => {
  return useContext(StatusContext);
};

export const StatusProvider = ({ children }: any) => {
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

  const dataContext = {
    data: data,
    setStatus: setStatus,
    setSituacao: setSituacao,
  };

  return (
    <StatusContext.Provider value={dataContext}>
      {children}
    </StatusContext.Provider>
  );
};
