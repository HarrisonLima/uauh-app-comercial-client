import { UsuarioProvider } from "../../../hooks/context/useUsuarioContext";
import AddUsuario from "../../../components/Modals/Add/AddUsuario";
import { ModalProvider } from "../../../hooks/context/useModalContext";

const Usuario = () => {
  return (
    <UsuarioProvider>
      <ModalProvider>
        <AddUsuario />
      </ModalProvider>
    </UsuarioProvider>
  );
};

export default Usuario;
