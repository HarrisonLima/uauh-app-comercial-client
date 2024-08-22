import { useEditContext } from "../../../../hooks/context/useEditContext";
import { useEffect, useState } from "react";
import { useModalContext } from "../../../../hooks/context/useModalContext";
import { faCirclePlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import useStatus from "../../../../hooks/operators/useStatus";

import ModalStructure from "../../Structure/index";
import Input from "../../../Input";
import Button from "../../../Button";
import Text from "../../../Text";
import Icon from "../../../Icon";
import Radio from "../../../Radio";
import getData from "../../../../api/Restfull/get";

const EditStatus = () => {
  const { UPDATE_Status } = useStatus();
  const { rowData, setRowData } = useEditContext();
  const { setModal, setType } = useModalContext();
  const [windowWidth] = useState(window.innerWidth);
  
  const [object, setObject] = useState({
    id: 0,
    status: "",
    situacao: "",
  });

  useEffect(() => {
    const fetch = async () => {
      if (rowData) {
        const data = await getData("status", Number(rowData.rowData[0]));
        setObject({
          id: data["id"],
          status: data["Status"],
          situacao: data["Situação"],
        });
      }
    };
    fetch();
  }, [rowData]);

  const handleSelectChange = (selectedOption: string) => {
    setObject({ ...object, situacao: selectedOption });
  };

  const handleChangeStatus = (value: any[]) => {
    setObject({ ...object, status: value[0] });
  };

  const handleClose = () => {
    setRowData([]);
    setModal("");
    setType("");
  };

  return (
    <ModalStructure modalVariant="ComponentsArea">
      <header className="modal-edit__header">
        <Text icon={faCirclePlus} fontText="Editar status" variant="h1" />
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
          label="Status"
          placeholder="Status"
          characters="text"
          size={windowWidth <= 480 ? "xl" : "lg"}
          value={object.status}
          onChange={handleChangeStatus}
        />
        <div className="modal-edit__button">
          <Button fontText="Gravar" onClick={() => UPDATE_Status(object)} />
        </div>
      </div>
    </ModalStructure>
  );
};

export default EditStatus;
