import { useEditContext } from "../../../../hooks/context/useEditContext";
import { useEffect, useState } from "react";
import { useModalContext } from "../../../../hooks/context/useModalContext";
import { faCirclePlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import useProduto from "../../../../hooks/operators/useProduto";

import ModalStructure from "../../Structure/index";
import Input from "../../../Input";
import Button from "../../../Button";
import Text from "../../../Text";
import Radio from "../../../Radio";
import Icon from "../../../Icon";
import getData from "../../../../api/Restfull/get";

const EditProduto = () => {
  const { UPDATE_Produto } = useProduto();
  const { rowData, setRowData } = useEditContext();
  const { setModal, setType } = useModalContext();
  const [windowWidth] = useState(window.innerWidth);

  const [object, setObject] = useState({
    id: 0,
    produto: "",
    situacao: "",
  });

  useEffect(() => {
    const fetch = async () => {
      if (rowData) {
        const data = await getData("produtos", Number(rowData.rowData[0]));
        setObject({
          id: data["id"],
          produto: data["Produto"],
          situacao: data["Situação"],
        });
      }
    };
    fetch();
  }, [rowData]);

  const handleSelectChange = (selectedOption: string) => {
    setObject({ ...object, situacao: selectedOption });
  };

  const handleChangeProduto = (value: any[]) => {
    setObject({ ...object, produto: value[0] });
  };

  const handleClose = () => {
    setRowData([]);
    setModal("");
    setType("");
  };

  return (
    <ModalStructure modalVariant="ComponentsArea">
      <header className="modal-edit__header">
        <Text icon={faCirclePlus} fontText="Editar produto" variant="h1" />
        <Icon
          icon={faXmark}
          color="red"
          variant="button"
          onClick={handleClose}
        />
      </header>
      <div className="modal-edit__content">
        <Text
          fontText="Pressione o botão para gravar as informações modificadas"
          variant="h3"
        />
        <Radio
          options={["Ativo", "Inativo"]}
          defaultChecked={object.situacao}
          onClick={handleSelectChange}
        />
        <Input
          type="text"
          label="Produto"
          placeholder="Digite o produto..."
          characters="text"
          size={windowWidth <= 480 ? "xl" : "lg"}
          value={object.produto}
          onChange={handleChangeProduto}
        />
        <div className="modal-edit__button">
          <Button fontText="Gravar" onClick={() => UPDATE_Produto(object)} />
        </div>
      </div>
    </ModalStructure>
  );
};

export default EditProduto;
