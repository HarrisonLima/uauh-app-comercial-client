import { createContext, useContext, useState } from "react";

const initialModal = {
  modal: "",
  type: "",
};

export const ModalContext = createContext<{
  modal: typeof initialModal;
  setModal: (modal: string) => void;
  setType: (type: string) => void;
}>({
  modal: initialModal,
  setModal: () => {},
  setType: () => {},
});

export const useModalContext = () => {
  return useContext(ModalContext);
};

export const ModalProvider = ({ children }: any) => {
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

  const dataContext = {
    modal: modalObject,
    setModal: setModal,
    setType: setType,
  };

  return (
    <ModalContext.Provider value={dataContext}>
      {children}
    </ModalContext.Provider>
  );
};
