import { useState } from "react";
import { useModalContext } from "../../../../hooks/context/useModalContext";
import { usePerfilAcessoContext } from "../../../../hooks/context/usePerfilAcessoContext";
import { faIdCard } from "@fortawesome/free-solid-svg-icons";
import usePerfilAcesso from "../../../../hooks/operators/usePerfilAcesso";
import Button from "../../../Button";
import Input from "../../../Input";
import ModalMessage from "../../../../utility/ModalMessage";
import ModalStructure from "../../Structure";
import Text from "../../../Text";

const AddPerfilAcesso = () => {
  const { data, setPerfilAcesso } = usePerfilAcessoContext();
  const { ADD_PerfilAcesso } = usePerfilAcesso();
  const { modal, setModal, setType } = useModalContext();
  const [windowWidth] = useState(window.innerWidth);
  const [invalidData, setInvalidData] = useState(false);
  const [keyVersion, setKeyVersion] = useState(0);

  const handleChangeData = (data: any[]) => {
    setPerfilAcesso(data[0]);
    data[1] === "Invalid" ? setInvalidData(true) : setInvalidData(false);
  };

  const handleButtonClick = () => {
    setType("Message");
    invalidData ? setModal("InformacoesInvalidas") : ADD_PerfilAcesso();
    toggleVersion();
  };

  const toggleVersion = () => {
    setKeyVersion((prevKey) => prevKey + 1);
  };

  return (
    <>
      <ModalStructure modalVariant="ComponentsArea">
        <Text
          variant="h1"
          icon={faIdCard}
          fontText="Cadastro perfil de acesso"
        />
        <div className="modal-add__content">
          <h3 className="heading--tertiary">
            Preencha o(s) campo(s) para realizar o cadastro.
          </h3>
          <form>
            <Input
              key={keyVersion}
              type="text"
              characters="text"
              label="Perfil acesso"
              length={[30, 5]}
              size={windowWidth <= 480 ? "xl" : "lg"}
              placeholder="Digite o perfil..."
              value={data.perfilAcesso}
              onChange={handleChangeData}
            />
          </form>
          <details>
            <summary>Requisitos</summary>
            <ul>
              <li>Deve conter entre 05 e 30 caracteres.</li>
            </ul>
          </details>
          <div className="modal-add__content__button">
            <Button fontText="Cadastrar" onClick={handleButtonClick} />
          </div>
        </div>
      </ModalStructure>
      <section
        className="modal-box-overlay"
        aria-hidden={modal.modal !== "" && modal.type === "Message"}
      >
        {ModalMessage()}
      </section>
    </>
  );
};

export default AddPerfilAcesso;
