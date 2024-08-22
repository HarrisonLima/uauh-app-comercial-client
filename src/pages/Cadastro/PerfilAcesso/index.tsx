import { ModalProvider } from "../../../hooks/context/useModalContext";
import { PerfilAcessoProvider } from "../../../hooks/context/usePerfilAcessoContext";
import AddPerfilAcesso from "./../../../components/Modals/Add/AddPerfilAcesso";

const PerfilAcesso = () => {
  return (
    <PerfilAcessoProvider>
      <ModalProvider>
          <AddPerfilAcesso />
      </ModalProvider>
    </PerfilAcessoProvider>
  );
};

export default PerfilAcesso;
