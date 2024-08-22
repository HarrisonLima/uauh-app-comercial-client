import { useModalContext } from "../../../hooks/context/useModalContext";
import { useEditContext } from "../../../hooks/context/useEditContext";
import { faKey } from "@fortawesome/free-solid-svg-icons";

import ModalStructure from "../../../components/Modals/Structure";
import Button from "../../../components/Button";
import Text from "../../../components/Text";
import useUsuario from "../../../hooks/operators/useUsuario";

const ConfirmResetPassword = () => {
  const { setModal, setType } = useModalContext();
  const { rowData } = useEditContext();
  const { RESET_PASSWORD_Usuario } = useUsuario();

  const object = {
    id: rowData.rowData[0],
  };

  const handleClose = () => {
    setModal("");
    setType("");
  };

  return (
    <ModalStructure modalVariant="ComponentsArea">
      <Text fontText="Redefinir senha" variant="h1" icon={faKey} />
      <div className="modal-interactive__content">
        <Text
          fontText="Tem certeza que deseja redefinir a senha?"
          variant="h3"
        />
        <div className="modal-interactive__content__button">
          <Button fontText="Cancelar" onClick={handleClose} />
          <Button
            fontText="Prosseguir"
            variant="sucess"
            onClick={() => {
              RESET_PASSWORD_Usuario(object);
              setModal("");
            }}
          />
        </div>
      </div>
    </ModalStructure>
  );
};

export default ConfirmResetPassword;
