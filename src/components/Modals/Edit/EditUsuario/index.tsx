import { useEffect, useState } from "react";
import { useEditContext } from "../../../../hooks/context/useEditContext";
import { useModalContext } from "../../../../hooks/context/useModalContext";
import { faCirclePlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import useUsuario from "../../../../hooks/operators/useUsuario";

import ModalStructure from "../../Structure/index";
import Input from "../../../Input";
import Button from "../../../Button";
import Dropdown from "../../../Dropdown";
import Text from "../../../Text";
import Radio from "../../../Radio";
import Icon from "../../../Icon";
import getData from "../../../../api/Restfull/get";
import DropdownData from "../../../../utility/DropdownData";

const EditUsuario = () => {
  const { UPDATE_Usuario } = useUsuario();
  const { rowData, setRowData } = useEditContext();
  const { setModal, setType } = useModalContext();
  const [perfis, setPerfis] = useState<any[]>([]);
  const [windowWidth] = useState(window.innerWidth);

  const [object, setObject] = useState({
    id: 0,
    perfilAcesso: "",
    nome: "",
    usuario: "",
    situacao: "",
  });

  useEffect(() => {
    const fetch = async () => {
      if (rowData) {
        const data = await getData("usuarios", Number(rowData.rowData[0]));
        setObject({
          id: data.id,
          perfilAcesso: data["Perfil Acesso"],
          nome: data["Nome"],
          usuario: data["Usuário"],
          situacao: data["Situação"],
        });
      }
    };
    fetch();
  }, [rowData]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData("perfis");
      setPerfis(result);
    };
    fetchData();
  }, []);

  const handleSelectChange = (selectedOption: string) => {
    setObject({ ...object, situacao: selectedOption });
  };

  const handleChangeNome = (value: any[]) => {
    setObject({ ...object, nome: value[0] });
  };

  const handleChangeUsuario = (value: any[]) => {
    setObject({ ...object, usuario: value[0] });
  };

  const handleDropdown = (option: any[]) => {
    setObject({ ...object, perfilAcesso: option[1] });
  };

  const handleClose = () => {
    setRowData([]);
    setModal("");
    setType("");
  };

  return (
    <ModalStructure modalVariant="ComponentsArea">
      <header className="modal-edit__header">
        <Text icon={faCirclePlus} fontText="Editar usuário" variant="h1" />
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
          label="Nome"
          placeholder="Nome"
          size={windowWidth <= 480 ? "xl" : "lg"}
          characters="text"
          value={object.nome}
          onChange={handleChangeNome}
        />
        <form>
          <Input
            type="text"
            label="Usuário"
            placeholder="Usuário"
            characters="text"
            value={object.usuario}
            size={windowWidth <= 480 ? "xl" : "md"}
            onChange={handleChangeUsuario}
          />
          <Dropdown
            options={DropdownData(true, perfis, "Perfil Acesso")}
            fontText="Perfil"
            onChange={handleDropdown}
            value={object.perfilAcesso}
            size={windowWidth <= 480 ? "xl" : "md"}
          />
        </form>
        <div className="modal-edit__button">
          <Button fontText="Gravar" onClick={() => UPDATE_Usuario(object)} />
        </div>
      </div>
    </ModalStructure>
  );
};

export default EditUsuario;
