import { useParams } from "react-router-dom";
import { useModalContext } from "../../../hooks/context/useModalContext";
import { useEffect, useState } from "react";
import { faBuildingFlag, faCheck } from "@fortawesome/free-solid-svg-icons";
import useCredenciamentoCliente from "../../../hooks/operators/useCliente";
import ModalStructure from "../../../components/Modals/Structure";
import Text from "../../../components/Text";
import getData from "../../../api/Restfull/get";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import Radio from "../../../components/Radio";
import useMask from "../../../hooks/useMask";

interface ICliente {
  cnpj: string;
  orgaoPublico: boolean;
  simplesNacional: boolean;
  razaoSocial: string;
  inscricaoEstadual: string;
  ramoAtividade: string;
  nomeFantasia: string;
  telefone: string;
  email: string;
}

interface IMatriz {
  cnpj: string;
  razaoSocial: string;
}

const CredenciarFilial = () => {
  const params = useParams();
  const paramsCnpj = params.cnpj!;
  const [selectedRadioOption, setSelectedRadioOption] = useState("");
  const { setModal, setType } = useModalContext();
  const { ADD_Filial, LINK_Filial } = useCredenciamentoCliente();
  const { cnpjMask, clearCnpjMask } = useMask();

  const initialCliente: ICliente = {
    cnpj: "",
    orgaoPublico: true,
    simplesNacional: true,
    razaoSocial: "",
    inscricaoEstadual: "",
    ramoAtividade: "",
    nomeFantasia: "",
    telefone: "",
    email: "",
  };

  const initialMatriz: IMatriz = {
    cnpj: paramsCnpj,
    razaoSocial: "",
  };

  const [cliente, setCliente] = useState<ICliente>(initialCliente);
  const [matriz, setMatriz] = useState<IMatriz>(initialMatriz);

  useEffect(() => {
    const fetch = async () => {
      const cliente = await getData(
        "credenciamentos/clientes/identificacoes",
        paramsCnpj
      );

      if (cliente.length > 0) {
        const updatedCliente = {
          cnpj: paramsCnpj,
          razaoSocial: cliente[0]["Razão social"],
        };

        setMatriz(updatedCliente);
      }
    };

    fetch();
  }, []);

  const handleClickCadastrar = () => {
    const data = {
      matriz: paramsCnpj,
      cnpj: clearCnpjMask(cliente.cnpj),
      orgaoPublico: cliente.orgaoPublico,
      simplesNacional: cliente.simplesNacional,
      razaoSocial: cliente.razaoSocial,
      inscricaoEstadual: cliente.inscricaoEstadual,
      ramoAtividade: cliente.ramoAtividade,
      nomeFantasia: cliente.nomeFantasia,
      telefone: cliente.telefone,
      email: cliente.email,
    };

    if (
      cliente.cnpj !== "" &&
      cliente.inscricaoEstadual !== "" &&
      cliente.email !== "" &&
      cliente.nomeFantasia !== "" &&
      cliente.ramoAtividade !== "" &&
      cliente.razaoSocial !== "" &&
      cliente.telefone !== ""
    ) {
      ADD_Filial(data);
    }
  };

  const handleClickVincular = () => {
    const data = {
      matriz: paramsCnpj,
      filial: clearCnpjMask(cliente.cnpj),
    };

    if (cliente.cnpj !== "") {
      LINK_Filial(data);
    }
  };

  const handleClickCancel = () => {
    setModal("");
    setType("");
  };

  return (
    <ModalStructure modalVariant="ComponentsArea">
      <Text
        fontText="Credenciar filial"
        variant="h1"
        icon={faBuildingFlag}
        theme="default"
      />
      <div className="modal-interactive__content">
        <Text
          fontText={`${cnpjMask(matriz.cnpj)} - ${matriz.razaoSocial}`}
          variant="h3"
        />
        <Radio
          defaultChecked="Sem cadastro"
          options={["Sem cadastro", "Cadastrado"]}
          onClick={(option) => setSelectedRadioOption(option)}
        />
        {selectedRadioOption === "Sem cadastro" ? (
          <>
            <div
              className="cliente__structure__selects"
              style={{ justifyContent: "center" }}
            >
              <div className="select__box">
                <p>Órgão público</p>
                <Select
                  options={["Sim", "Não"]}
                  optionDefault={cliente.orgaoPublico ? "Sim" : "Não"}
                  onSelectChange={(option: string) =>
                    setCliente((prevState) => ({
                      ...prevState,
                      orgaoPublico: option === "Sim" ? true : false,
                    }))
                  }
                />
              </div>
              <div className="select__box">
                <p>Simples nacional</p>
                <Select
                  options={["Sim", "Não"]}
                  optionDefault={cliente.simplesNacional ? "Sim" : "Não"}
                  onSelectChange={(option: string) =>
                    setCliente((prevState) => ({
                      ...prevState,
                      simplesNacional: option === "Sim" ? true : false,
                    }))
                  }
                />
              </div>
            </div>
            <form>
              <Input
                size="xl"
                type="text"
                characters="text"
                label="Razão social"
                placeholder="Digite a razão social..."
                value={cliente.razaoSocial}
                onChange={(valor: any[]) =>
                  setCliente((prevState) => ({
                    ...prevState,
                    razaoSocial: valor[0],
                  }))
                }
              />
              <Input
                label="CNPJ"
                type="text"
                characters="number"
                name="CNPJ"
                size="xl"
                placeholder="00.000.000/000-00"
                validationType="CNPJ"
                value={cliente.cnpj}
                onChange={(valor: any[]) =>
                  setCliente((prevState) => ({
                    ...prevState,
                    cnpj: valor[0],
                  }))
                }
              />
              <Input
                size="xl"
                type="text"
                characters="text"
                label="Nome fantasia"
                placeholder="Digite o nome fantasia..."
                value={cliente.nomeFantasia}
                onChange={(valor: any[]) =>
                  setCliente((prevState) => ({
                    ...prevState,
                    nomeFantasia: valor[0],
                  }))
                }
              />
              <Input
                size="xl"
                type="text"
                characters="text"
                label="Inscrição estadual"
                placeholder="Digite a inscrição estadual..."
                value={cliente.inscricaoEstadual}
                onChange={(valor: any[]) =>
                  setCliente((prevState) => ({
                    ...prevState,
                    inscricaoEstadual: valor[0],
                  }))
                }
              />
              <Input
                size="xl"
                type="text"
                characters="text"
                label="Ramo de atividade"
                placeholder="Digite o ramo de atividade..."
                value={cliente.ramoAtividade}
                onChange={(valor: any[]) =>
                  setCliente((prevState) => ({
                    ...prevState,
                    ramoAtividade: valor[0],
                  }))
                }
              />
              <Input
                size="xl"
                type="text"
                characters="value"
                validationType="Telefone"
                label="Telefone"
                placeholder="+55 (00) 0000-0000"
                value={cliente.telefone}
                onChange={(valor: any[]) =>
                  setCliente((prevState) => ({
                    ...prevState,
                    telefone: valor[0],
                  }))
                }
              />
              <Input
                size="xl"
                type="text"
                characters="all"
                label="E-mail"
                placeholder="email_exemplo@gmail.com"
                value={cliente.email}
                onChange={(valor: any[]) =>
                  setCliente((prevState) => ({
                    ...prevState,
                    email: valor[0],
                  }))
                }
              />
            </form>
            <div className="modal-interactive__content__button">
              <Button fontText="Cancelar" onClick={() => handleClickCancel()} />
              <Button
                fontText="Cadastrar"
                icon={faCheck}
                variant="sucess"
                onClick={handleClickCadastrar}
              />
            </div>
          </>
        ) : (
          <>
            <Input
              label="CNPJ"
              type="text"
              characters="number"
              name="CNPJ"
              size="xl"
              placeholder="00.000.000/0000-00"
              validationType="CNPJ"
              value={cliente.cnpj}
              onChange={(valor: any[]) =>
                setCliente((prevState) => ({
                  ...prevState,
                  cnpj: valor[0],
                }))
              }
            />
            <div className="modal-interactive__content__button">
              <Button fontText="Cancelar" onClick={() => handleClickCancel()} />
              <Button
                fontText="Vincular"
                icon={faCheck}
                variant="sucess"
                onClick={handleClickVincular}
              />
            </div>
          </>
        )}
      </div>
    </ModalStructure>
  );
};

export default CredenciarFilial;
