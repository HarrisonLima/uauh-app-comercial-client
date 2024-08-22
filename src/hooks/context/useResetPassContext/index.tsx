import { createContext, useContext, useState } from "react";

const initialResetPass = {
  id: 0,
  password: "",
  reseted: false,
};

export const ResetPassContext = createContext<{
  dataResetPass: typeof initialResetPass;
  setId: (id: number) => void;
  setPassword: (password: string) => void;
  setReset: (reseted: boolean) => void;
}>({
  dataResetPass: initialResetPass,
  setId: () => {},
  setPassword: () => {},
  setReset: () => {},
});

export const useResetPassContext = () => {
  return useContext(ResetPassContext);
};

export const ResetPassProvider = ({ children }: any) => {
  const [dataResetPass, setDataResetPass] = useState(initialResetPass);

  const setId = (id: number) => {
    setDataResetPass((prevState) => ({
      ...prevState,
      id: id,
    }));
  };

  const setPassword = (password: string) => {
    setDataResetPass((prevState) => ({
      ...prevState,
      password: password,
    }));
  };

  const setReset = (reseted: boolean) => {
    setDataResetPass((prevState) => ({
      ...prevState,
      reseted: reseted,
    }));
  };

  const dataContext = {
    dataResetPass: dataResetPass,
    setId: setId,
    setPassword: setPassword,
    setReset: setReset,
  };

  return (
    <ResetPassContext.Provider value={dataContext}>
      {children}
    </ResetPassContext.Provider>
  );
};
