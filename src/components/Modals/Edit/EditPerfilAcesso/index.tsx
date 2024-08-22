import { useEffect, useState } from "react";
import { useEditContext } from "../../../../hooks/context/useEditContext";
import { useModalContext } from "../../../../hooks/context/useModalContext";
import { faCirclePlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import usePerfilAcesso from "../../../../hooks/operators/usePerfilAcesso";

import ModalStructure from "../../Structure/index";
import Input from "../../../Input";
import Button from "../../../Button";
import Text from "../../../Text";
import Radio from "../../../Radio";
import Icon from "../../../Icon";
import getData from "../../../../api/Restfull/get";

const EditPerfilAcesso = () => {
  const { UPDATE_PerfilAcesso } = usePerfilAcesso();
  const { rowData, setRowData } = useEditContext();
  const { setModal, setType } = useModalContext();
  const [windowWidth] = useState(window.innerWidth);
  const [object, setObject] = useState({
    id: 0,
    perfilAcesso: "",
    situacao: "",
  });

  useEffect(() => {
    const fetch = async () => {
      if (rowData) {
        const data = await getData("perfis", Number(rowData.rowData[0]));
        setObject({
          id: data["id"],
          perfilAcesso: data["Perfil Acesso"],
          situacao: data["Situação"],
        });
      }
    };
    fetch();
  }, [rowData]);

  const handleSelectChange = (selectedOption: string) => {
    setObject({ ...object, situacao: selectedOption });
  };

  const handleChangePerfilAcesso = (value: any[]) => {
    setObject({ ...object, perfilAcesso: value[0] });
  };

  const handleClose = () => {
    setRowData([]);
    setModal("");
    setType("");
  };

  return (
    <ModalStructure modalVariant="ComponentsArea">
      <header className="modal-edit__header">
        <Text
          icon={faCirclePlus}
          fontText="Editar perfil acesso"
          variant="h1"
        />
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
          label="Perfil acesso"
          placeholder="Perfil acesso"
          characters="text"
          size={windowWidth <= 480 ? "xl" : "lg"}
          value={object.perfilAcesso}
          onChange={handleChangePerfilAcesso}
        />
        <div className="modal-edit__button">
          <Button
            fontText="Gravar"
            onClick={() => UPDATE_PerfilAcesso(object)}
          />
        </div>
      </div>
    </ModalStructure>
  );
};

export default EditPerfilAcesso;
