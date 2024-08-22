import { useState } from "react";
import { useModalContext } from "../../../../hooks/context/useModalContext";
import { useStatusContext } from "../../../../hooks/context/useStatusContext";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import useStatus from "../../../../hooks/operators/useStatus";
import Button from "../../../Button";
import Input from "../../../Input";
import ModalMessage from "../../../../utility/ModalMessage";
import ModalStructure from "../../Structure";
import Text from "../../../Text";

const AddStatus = () => {
  const { data, setStatus } = useStatusContext();
  const { ADD_Status } = useStatus();
  const [windowWidth] = useState(window.innerWidth);
  const { modal, setModal, setType } = useModalContext();

  const [invalidData, setInvalidData] = useState(false);
  const [keyVersion, setKeyVersion] = useState(0);

  const handleChangeData = (data: any[]) => {
    setStatus(data[0]);
    data[1] === "Invalid" ? setInvalidData(true) : setInvalidData(false);
  };

  const handleButtonClick = () => {
    setType("Message");
    invalidData ? setModal("InformacoesInvalidas") : ADD_Status();
    toggleVersion();
  };

  const toggleVersion = () => {
    setKeyVersion((prevKey) => prevKey + 1);
  };

  return (
    <>
      <ModalStructure modalVariant="ComponentsArea">
        <Text variant="h1" icon={faCircleInfo} fontText="Cadastro status" />
        <div className="modal-add__content">
        <h3 className="heading--tertiary">
            Preencha o(s) campo(s) para realizar o cadastro.
          </h3>
          <form>
            <Input
              key={keyVersion}
              type="text"
              characters="text"
              label="Status"
              size={windowWidth <= 480 ? "xl" : "lg"}
              length={[30, 5]}
              placeholder="Digite o status..."
              value={data.status}
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

export default AddStatus;
