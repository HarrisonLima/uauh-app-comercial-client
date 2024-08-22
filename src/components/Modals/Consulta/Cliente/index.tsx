import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import ModalStructure from "../../Structure";
import Text from "./../../../Text";
import { useEffect, useState } from "react";
import getData from "../../../../api/Restfull/get";
import Table from "./../../../Table/index";
import TableEmpty from "../../../Table/Empty";
import Input from "../../../Input";
import Dropdown from "../../../Dropdown";
import DropdownData from "../../../../utility/DropdownData";
import Button from "../../../Button";

interface ICliente {
  cnpj: string;
  nomeFantasia: string;
  status: string;
  credenciado: string;
  aprovador: string;
  dataCriacao: string;
  dataAprovacao: string;
}

const ModalConsultaCliente = () => {
  const [clientes, setClientes] = useState<ICliente[]>([]);
  const [keyVersion, setKeyVersion] = useState(0);
  const [tableJSX, setTableJSX] = useState<JSX.Element | null>(null);
  const [statusArray, setStatusArray] = useState<any[]>([]);
  const [status, setStatus] = useState("");
  const [filters, setFilters] = useState<{ [key: string]: string }[]>([]);
  const [dropdownKey, setDropdownKey] = useState(0);
  const [cnpj, setCnpj] = useState("");
  const [nomeFantasia, setNomeFantasia] = useState("");
  const [credenciador, setCredenciador] = useState("");
  const [windowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const fetch = async () => {
      const clientes = await getData("/credenciamentos/clientes/status");

      if (clientes.length > 0) {
        clientes.forEach((cliente: any) => {
          cliente["Aprovador"] =
            cliente["Aprovador"] === null ? "" : cliente["Aprovador"];
          cliente["Data de aprovação"] =
            cliente["Data de aprovação"] === null
              ? ""
              : cliente["Data de aprovação"];
        });

        setClientes(clientes);
      }
    };

    fetch();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const status = await getData("status");

      setStatusArray(status);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const generateTableJSX = () => {
      if (clientes.length > 0) {
        setKeyVersion((prev) => prev + 1);
        return (
          <Table
            key={keyVersion + 1}
            header={Object.keys(clientes[0])}
            response={clientes.map((obj: any) => Object.values(obj))}
            filters={filters}
            actions={["Link"]}
            onLink={(data: any) =>
              window.location.assign(
                `/credenciamento/cliente/revisao/${data[0]}`
              )
            }
          />
        );
      } else {
        return <TableEmpty />;
      }
    };

    const tableComponent = generateTableJSX();

    setTableJSX(tableComponent);
  }, [clientes, filters]);

  const handleDropdown = (option: any) => {
    setStatus(option.text);
  };

  const removeFilter = (column: string) => {
    const updatedFilters = filters.filter(
      (filter) => Object.keys(filter)[0] !== column
    );
    setFilters(updatedFilters);
  };

  const hasFilter = (column: string) => {
    return filters.some((filter) => Object.keys(filter)[0] === column);
  };

  const clearFilters = () => {
    setCnpj("");
    setNomeFantasia("");
    setCredenciador("");
    setStatus("");
    setFilters([]);
    setDropdownKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    if (cnpj !== "") {
      const newFilter = hasFilter("CNPJ");
      if (!newFilter) {
        setFilters((prevFilters) => [...prevFilters, { CNPJ: cnpj }]);
      } else {
        setFilters((prevFilters) =>
          prevFilters.map((filter) =>
            Object.keys(filter)[0] === "CNPJ" ? { CNPJ: cnpj } : filter
          )
        );
      }
    } else {
      removeFilter("CNPJ");
    }
  }, [cnpj]);

  useEffect(() => {
    if (nomeFantasia !== "") {
      const newFilter = hasFilter("Nome fantasia");
      if (!newFilter) {
        setFilters((prevFilters) => [
          ...prevFilters,
          { "Nome fantasia": nomeFantasia },
        ]);
      } else {
        setFilters((prevFilters) =>
          prevFilters.map((filter) =>
            Object.keys(filter)[0] === "Nome fantasia"
              ? { "Nome fantasia": nomeFantasia }
              : filter
          )
        );
      }
    } else {
      removeFilter("Nome fantasia");
    }
  }, [nomeFantasia]);

  useEffect(() => {
    if (credenciador !== "") {
      const newFilter = hasFilter("Credenciador");
      if (!newFilter) {
        setFilters((prevFilters) => [
          ...prevFilters,
          { Credenciador: credenciador },
        ]);
      } else {
        setFilters((prevFilters) =>
          prevFilters.map((filter) =>
            Object.keys(filter)[0] === "Credenciador"
              ? { Credenciador: credenciador }
              : filter
          )
        );
      }
    } else {
      removeFilter("Credenciador");
    }
  }, [credenciador]);

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

  return (
    <ModalStructure>
      <Text fontText="Clientes" icon={faBuilding} variant="h1" />
      <div className="list__filters__box">
        <div className="list__filters">
          <Input
            type="number"
            label="CNPJ"
            name="CNPJ"
            placeholder="00.000.000/0000-00"
            value={cnpj}
            onChange={(value: string[]) => {
              setCnpj(value[0]);
            }}
            size={windowWidth <= 480 ? "xl" : "md"}
          />
          <Input
            label="Nome fantasia"
            type="text"
            characters="all"
            placeholder="Buscar por nome"
            value={nomeFantasia}
            size={windowWidth <= 480 ? "xl" : "md"}
            onChange={(value: string[]) => {
              setNomeFantasia(value[0]);
            }}
          />
          <Input
            label="Credenciador"
            type="text"
            characters="all"
            placeholder="Buscar por credenciador"
            value={credenciador}
            size={windowWidth <= 480 ? "xl" : "md"}
            onChange={(value: string[]) => {
              setCredenciador(value[0]);
            }}
          />
          <Dropdown
            key={dropdownKey}
            options={DropdownData(true, statusArray, "Status")}
            fontText="Status"
            onChange={handleDropdown}
            size={windowWidth <= 480 ? "xl" : "md"}
          />
          <Button fontText="Limpar" onClick={clearFilters} />
        </div>
      </div>
      {tableJSX}
    </ModalStructure>
  );
};

export default ModalConsultaCliente;
