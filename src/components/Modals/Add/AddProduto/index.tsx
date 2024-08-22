import { useState } from "react";
import { useModalContext } from "../../../../hooks/context/useModalContext";
import { useProdutoContext } from "../../../../hooks/context/useProdutoContext";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import useProduto from "../../../../hooks/operators/useProduto";
import Button from "../../../Button";
import Input from "../../../Input";
import ModalMessage from "../../../../utility/ModalMessage";
import ModalStructure from "../../Structure";
import Text from "../../../Text";

const AddProduto = () => {
  const { modal, setModal, setType } = useModalContext();
  const { ADD_Produto } = useProduto();
  const { data, setProduto } = useProdutoContext();
  const [windowWidth] = useState(window.innerWidth);
  const [invalidData, setInvalidData] = useState(false);
  const [keyVersion, setKeyVersion] = useState(0);

  const handleChangeData = (data: any[]) => {
    setProduto(data[0]);
    data[1] === "Invalid" ? setInvalidData(true) : setInvalidData(false);
  };

  const handleButtonClick = () => {
    setType("Message");
    invalidData ? setModal("InformacoesInvalidas") : ADD_Produto();
    toggleVersion();
  };

  const toggleVersion = () => {
    setKeyVersion((prevKey) => prevKey + 1);
  };

  return (
    <>
      <ModalStructure modalVariant="ComponentsArea">
        <Text variant="h1" icon={faCreditCard} fontText="Cadastro produto" />
        <div className="modal-add__content">
        <h3 className="heading--tertiary">
            Preencha o(s) campo(s) para realizar o cadastro.
          </h3>
          <form>
            <Input
              key={keyVersion}
              type="text"
              characters="all"
              size={windowWidth <= 480 ? "xl" : "lg"}
              label="Produto"
              length={[30, 5]}
              placeholder="Digite o produto..."
              value={data.produto}
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

export default AddProduto;
