import { useEffect, useState } from "react";
import { useModalContext } from "../../../../hooks/context/useModalContext";
import { useEditContext } from "../../../../hooks/context/useEditContext";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import useCookies from "../../../../storage/Cookies";

import ModalStructure from "../../Structure";
import Text from "../../../Text";
import ModalMessage from "../../../../utility/ModalMessage";
import EditUsuario from "../../Edit/EditUsuario";
import DropdownData from "../../../../utility/DropdownData";
import getData from "../../../../api/Restfull/get";
import Input from "../../../Input";
import Dropdown from "../../../Dropdown";
import Button from "../../../Button";
import TableEmpty from "../../../Table/Empty";
import Table from "../../../Table";
import { CSVLink } from "react-csv";

const ListUsuarios = () => {
  const { modal, setModal, setType } = useModalContext();
  const [usuario, setUsuario] = useState("");
  const [nome, setNome] = useState("");
  const [situacao, setSituacao] = useState("");
  const [perfil, setPerfil] = useState("");
  const [dropdownOptions] = useState(DropdownData(false, ["Ativo", "Inativo"]));
  const [dropdownKey, setDropdownKey] = useState(0);
  const [perfis, setPerfs] = useState<any[]>([]);
  const { setRowData } = useEditContext();
  const { GET_Profile } = useCookies();
  const profile = GET_Profile();
  const [data, setData] = useState<any[]>([]);
  const [filters, setFilters] = useState<{ [key: string]: string }[]>([]);
  const [windowWidth] = useState(window.innerWidth);
  useEffect(() => {
    async function fetchData() {
      const result = await getData("usuarios");
      setData(result);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData("perfis");
      setPerfs(result);
    };
    fetchData();
  }, []);

  const clearFilters = () => {
    setUsuario("");
    setSituacao("");
    setFilters([]);
    setDropdownKey((prevKey) => prevKey + 1);
  };

  const handleEdit = (data: any) => {
    setRowData(data);
    setModal("Usuários");
  };

  const handleResetPassword = (data: any) => {
    setRowData(data);
    setType("Message");
    setModal("ConfirmarRedefinicaoSenha");
  };

  const hasFilter = (column: string) => {
    return filters.some((filter) => Object.keys(filter)[0] === column);
  };

  const removeFilter = (column: string) => {
    const updatedFilters = filters.filter(
      (filter) => Object.keys(filter)[0] !== column
    );
    setFilters(updatedFilters);
  };

  useEffect(() => {
    if (usuario !== "") {
      const newFilter = hasFilter("Usuário");
      if (!newFilter) {
        setFilters((prevFilters) => [...prevFilters, { Usuário: usuario }]);
      } else {
        setFilters((prevFilters) =>
          prevFilters.map((filter) =>
            Object.keys(filter)[0] === "Usuário" ? { Usuário: usuario } : filter
          )
        );
      }
    } else {
      removeFilter("Usuário");
    }
  }, [usuario]);

  useEffect(() => {
    if (nome !== "") {
      const newFilter = hasFilter("Nome");
      if (!newFilter) {
        setFilters((prevFilters) => [...prevFilters, { Nome: nome }]);
      } else {
        setFilters((prevFilters) =>
          prevFilters.map((filter) =>
            Object.keys(filter)[0] === "Nome" ? { Nome: nome } : filter
          )
        );
      }
    } else {
      removeFilter("Nome");
    }
  }, [nome]);

  useEffect(() => {
    if (perfil !== "") {
      const newFilter = hasFilter("Perfil Acesso");
      if (!newFilter) {
        setFilters((prevFilters) => [
          ...prevFilters,
          { "Perfil Acesso": perfil },
        ]);
      } else {
        setFilters((prevFilters) =>
          prevFilters.map((filter) =>
            Object.keys(filter)[0] === "Perfil Acesso"
              ? { "Perfil Acesso": perfil }
              : filter
          )
        );
      }
    } else {
      removeFilter("Perfil acesso");
    }
  }, [perfil]);

  useEffect(() => {
    if (situacao !== "") {
      const newFilter = hasFilter("Situação");
      if (!newFilter) {
        setFilters((prevFilters) => [...prevFilters, { Situação: situacao }]);
      } else {
        setFilters((prevFilters) =>
          prevFilters.map((filter) =>
            Object.keys(filter)[0] === "Situação"
              ? { Situação: situacao }
              : filter
          )
        );
      }
    } else {
      removeFilter("Situação");
    }
  }, [situacao]);

  return (
    <>
      <ModalStructure>
        <Text icon={faUser} fontText="Listagem de Usuários" variant="h1" />
        <div className="list__filters__box">
          <div className="list__filters">
            <Input
              label="Usuário"
              type="text"
              placeholder="Pesquise por usuário..."
              characters="all"
              value={usuario}
              size={windowWidth <= 480 ? "xl" : "lg"}
              onChange={(value: any[]) => {
                setUsuario(value[0]);
              }}
            />
            <Input
              label="Nome"
              type="text"
              placeholder="Pesquise por usuário..."
              characters="all"
              value={usuario}
              size={windowWidth <= 480 ? "xl" : "lg"}
              onChange={(value: any[]) => {
                setNome(value[0]);
              }}
            />
            <Dropdown
              options={DropdownData(true, perfis, "Perfil Acesso", false)}
              fontText="Perfil acesso"
              onChange={(option: { id: number; text: string }) => {
                setPerfil(option.text);
              }}
              size={windowWidth <= 480 ? "xl" : "md"}
            />
            <Dropdown
              key={dropdownKey}
              options={dropdownOptions}
              fontText="Situação"
              onChange={(option: { id: number; text: string }) => {
                setSituacao(option.text);
              }}
              size={windowWidth <= 480 ? "xl" : "md"}
            />
            <Button fontText="Limpar" onClick={clearFilters} />
          </div>
        </div>
        {data.length > 0 ? (
          <Table
            actions={
              profile.perfil === "Administrador" ? ["Edit", "Reset"] : undefined
            }
            filters={filters}
            header={Object.keys(data[0])}
            response={data.map((obj) => {
              return Object.values(obj);
            })}
            onEdit={handleEdit}
            onResetPassword={handleResetPassword}
          />
        ) : (
          <TableEmpty />
        )}
        {data.length > 0 && (
          <div className="list__link">
            <CSVLink data={data} filename="listagem-usuarios.csv">
              Exportar dados
            </CSVLink>
          </div>
        )}
      </ModalStructure>
      <div className="modal-box-overlay" aria-hidden={modal.modal !== ""}>
        {modal.modal === "Usuários" ? <EditUsuario /> : null}
        {modal.type === "Message" ? ModalMessage() : null}
      </div>
    </>
  );
};

export default ListUsuarios;
