import { useModalContext } from "../../../../hooks/context/useModalContext";
import { useEditContext } from "../../../../hooks/context/useEditContext";
import { useEffect, useState } from "react";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import useCookies from "../../../../storage/Cookies";

import ModalStructure from "../../Structure";
import Text from "../../../Text";
import ModalMessage from "../../../../utility/ModalMessage";
import EditStatus from "../../Edit/EditStatus";
import DropdownData from "../../../../utility/DropdownData";
import Dropdown from "../../../Dropdown";
import Input from "../../../Input";
import Button from "../../../Button";
import getData from "../../../../api/Restfull/get";
import Table from "../../../Table";
import TableEmpty from "../../../Table/Empty";
import { CSVLink } from "react-csv";

const ListStatus = () => {
  const { modal, setModal } = useModalContext();
  const [status, setStatus] = useState("");
  const [situacao, setSituacao] = useState("");
  const [dropdownOptions] = useState(DropdownData(false, ["Ativo", "Inativo"]));
  const { setRowData } = useEditContext();
  const [dropdownKey, setDropdownKey] = useState(0);
  const { GET_Profile } = useCookies();
  const profile = GET_Profile();
  const [data, setData] = useState<any[]>([]);
  const [filters, setFilters] = useState<{ [key: string]: string }[]>([]);
  const [windowWidth] = useState(window.innerWidth);

  useEffect(() => {
    async function fetchData() {
      const result = await getData("status");
      setData(result);
    }
    fetchData();
  }, []);

  const clearFilters = () => {
    setStatus("");
    setSituacao("");
    setFilters([]);
    setDropdownKey((prevKey) => prevKey + 1);
  };

  const handleEdit = (data: any) => {
    setRowData(data);
    setModal("Status");
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
    if (status !== "") {
      const newFilter = hasFilter("Status");
      if (!newFilter) {
        setFilters((prevFilters) => [...prevFilters, { Status: status }]);
      } else {
        setFilters((prevFilters) =>
          prevFilters.map((filter) =>
            Object.keys(filter)[0] === "Status" ? { Status: status } : filter
          )
        );
      }
    } else {
      removeFilter("Status");
    }
  }, [status]);

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
        <Text icon={faCircleInfo} fontText="Listagem status" variant="h1" />
        <div className="list__filters__box">
          <div className="list__filters">
            <Input
              label="Status"
              type="text"
              size={windowWidth <= 480 ? "xl" : "lg"}
              placeholder="Pesquise por status..."
              characters="text"
              value={status}
              onChange={(value: any[]) => {
                setStatus(value[0]);
              }}
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
                profile.perfil === "Administrador" ? ["Edit"] : undefined
              }
              filters={filters}
              header={Object.keys(data[0])}
              response={data.map((obj) => {
                return Object.values(obj);
              })}
              onEdit={handleEdit}
            />
          ) : (
            <TableEmpty />
          )}
        {data.length > 0 && (
          <div className="list__link">
            <CSVLink data={data} filename="listagem-status.csv">
              Exportar dados
            </CSVLink>
          </div>
        )}
      </ModalStructure>
      <div className="modal-box-overlay" aria-hidden={modal.modal !== ""}>
        {modal.modal === "Status" ? <EditStatus /> : null}
        {modal.type === "Message" ? ModalMessage() : null}
      </div>
    </>
  );
};

export default ListStatus;
