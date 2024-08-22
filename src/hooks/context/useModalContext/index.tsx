/* eslint-disable no-unused-vars */
import { createContext, ReactNode, useContext, useState } from "react";

const initialModal = {
  modal: "",
  type: "",
};

interface IContext {
  modal: typeof initialModal;
  setModal: (modal: string) => void;
  setType: (type: string) => void;
}

const noOp = () => {
  throw new Error("Function must be implemented in the Provider.");
};

export const ModalContext = createContext<IContext>({
  modal: initialModal,
  setModal: noOp,
  setType: noOp,
});

export const useModalContext = () => {
  return useContext(ModalContext);
};

interface IProvider {
  children: ReactNode;
}

export const ModalProvider = ({ children }: IProvider) => {
  const [modalObject, setModalObject] = useState(initialModal);

  const setModal = (modal: string) => {
    setModalObject((prevState) => ({
      ...prevState,
      modal: modal,
    }));
  };

  const setType = (type: string) => {
    setModalObject((prevState) => ({
      ...prevState,
      type: type,
    }));
  };

  const contextValue: IContext = {
    modal: modalObject,
    setModal: setModal,
    setType: setType,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};
