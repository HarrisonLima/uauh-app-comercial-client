import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useModalContext } from "../../../../../hooks/context/useModalContext";
import { faBuilding, faCheck } from "@fortawesome/free-solid-svg-icons";
import useCredenciamentoCliente from "../../../../../hooks/operators/useCliente";
import ModalStructure from "../../../Structure";
import Text from "../../../../Text";
import Input from "../../../../Input";
import Button from "../../../../Button";
import ProgressBar from "../../../../ProgressBar";
import getData from "../../../../../api/Restfull/get";
import ModalMessage from "../../../../../utility/ModalMessage";
import useCookies from "../../../../../storage/Cookies";
import TableEmpty from "../../../../Table/Empty";
import useMask from "../../../../../hooks/useMask";

interface ICliente {
  cnpj: string;
  cep: string;
  cidade: string;
  uf: string;
  numero: string;
  bairro: string;
  endereco: string;
  complemento: string;
}

interface IRegister {
  Status: string;
  Aprovador: string;
  Credenciador: string;
  ["Data criação"]: string;
  ["Data aprovação"]: string;
}

interface IMatriz {
  cnpj: string;
  razaoSocial: string;
}

const ClienteLocalizacao = () => {
  const [status, setStatus] = useState();
  const params = useParams();
    const paramsCnpj = params.cnpj ? params.cnpj : "";
  const { GET_Profile } = useCookies();
  const profile = GET_Profile();
  const { UPDATE_Localizacao } = useCredenciamentoCliente();
  const [fieldsetJSX, setFieldsetJSX] = useState<JSX.Element | null>(null);
  const { modal, setType, setModal } = useModalContext();
  const [windowWidth] = useState(window.innerWidth);
  const { cnpjMask } = useMask();

  const initialCliente: ICliente = {
    cnpj: paramsCnpj,
    cep: "",
    cidade: "",
    uf: "",
    numero: "",
    bairro: "",
    endereco: "",
    complemento: "",
  };

  const initialRegister: IRegister = {
    Status: "",
    Aprovador: "",
    Credenciador: "",
    ["Data criação"]: "",
    ["Data aprovação"]: "",
  };

  const [register, setRegister] = useState<IRegister>(initialRegister);

  const initialMatriz: IMatriz = {
    cnpj: "",
    razaoSocial: "",
  };

  const [matriz, setMatriz] = useState<IMatriz>(initialMatriz);

  useEffect(() => {
    const fetch = async () => {
      const cliente = await getData(
        "credenciamentos/clientes/localizacoes",
        paramsCnpj.replace(/[^\d]+/g, "")
      );

      if (cliente.length > 0) {
        const status = await getData(
          "credenciamentos/clientes/status",
          paramsCnpj.replace(/[^\d]+/g, "")
        );

        const newRegister = {
          Status: status[0]["Status"],
          Aprovador: status[0]["Aprovador"],
          Credenciador: status[0]["Credenciador"],
          ["Data criação"]: status[0]["Data de criação"],
          ["Data aprovação"]: status[0]["Data de aprovação"],
        };

        setStatus(status[0]["Status"]);
        setRegister(newRegister);

        const updatedCliente = {
          cnpj: paramsCnpj,
          cep: cliente[0]["CEP"],
          cidade: cliente[0]["Cidade"],
          uf: cliente[0]["UF"],
          numero: cliente[0]["Número"],
          bairro: cliente[0]["Bairro"],
          endereco: cliente[0]["Endereço"],
          complemento: cliente[0]["Complemento"],
        };

        setObject(updatedCliente);
      }

      const filial = await getData(
        "credenciamentos/clientes/filiais",
        paramsCnpj
      );

      if (filial.length > 0) {
        const matriz = await getData(
          "credenciamentos/clientes/identificacoes",
          filial[0]["Matriz"]
        );

        const updatedMatriz = {
          cnpj: matriz[0]["CNPJ"],
          razaoSocial: matriz[0]["Razão social"],
        };

        setMatriz(updatedMatriz);
      }
    };
    fetch();
  }, [paramsCnpj]);

  const [object, setObject] = useState<ICliente>(initialCliente);

  const isInputValid =
    (register.Credenciador &&
      register.Credenciador !== `${profile.nome}(${profile.usuario})`) ||
    (status !== "Desenvolvimento" &&
      status !== "Exclusão reprovada" &&
      status !== "Reprovado" &&
      status !== "Retornado");

  useEffect(() => {
    const generateJSX = () => {
      return (
        <form className="cliente__structure__form">
          <Input
            type="text"
            characters="value"
            validationType="CEP"
            label="CEP"
            length={[8]}
            placeholder="00000-000"
            isDisabled={isInputValid}
            onChange={(valor: any[]) =>
              setObject((prevState) => ({
                ...prevState,
                cep: valor[0],
              }))
            }
            size={windowWidth <= 480 ? "xl" : "md"}
            value={object.cep}
          />
          <Input
            type="text"
            characters="text"
            label="Cidade"
            placeholder="Digite a cidade..."
            isDisabled={isInputValid}
            onChange={(valor: any[]) =>
              setObject((prevState) => ({
                ...prevState,
                cidade: valor[0],
              }))
            }
            size={windowWidth <= 480 ? "xl" : "md"}
            value={object.cidade}
          />
          <Input
            type="text"
            characters="text"
            label="UF"
            length={[2]}
            onChange={(valor: any[]) =>
              setObject((prevState) => ({
                ...prevState,
                uf: valor[0],
              }))
            }
            placeholder="UF"
            size="sm"
            isDisabled={isInputValid}
            value={object.uf}
          />
          <Input
            type="text"
            characters="text"
            label="Número"
            size="sm"
            isDisabled={isInputValid}
            onChange={(valor: any[]) =>
              setObject((prevState) => ({
                ...prevState,
                numero: valor[0],
              }))
            }
            placeholder="000"
            value={object.numero}
          />
          <Input
            type="text"
            characters="text"
            label="Bairro"
            placeholder="Digite o bairro..."
            isDisabled={isInputValid}
            onChange={(valor: any[]) =>
              setObject((prevState) => ({
                ...prevState,
                bairro: valor[0],
              }))
            }
            size={windowWidth <= 480 ? "xl" : "md"}
            value={object.bairro}
          />
          <Input
            type="text"
            characters="all"
            label="Endereço"
            placeholder="Digite o endereço..."
            size={windowWidth <= 480 ? "xl" : "lg"}
            isDisabled={isInputValid}
            onChange={(valor: any[]) =>
              setObject((prevState) => ({
                ...prevState,
                endereco: valor[0],
              }))
            }
            value={object.endereco}
          />
          <Input
            type="text"
            characters="all"
            label="Complemento (opicional)"
            size={windowWidth <= 480 ? "xl" : "lg"}
            placeholder="Digite o complemento..."
            isDisabled={isInputValid}
            onChange={(valor: any[]) =>
              setObject((prevState) => ({
                ...prevState,
                complemento: valor[0],
              }))
            }
            value={object.complemento}
          />
        </form>
      );
    };

    const component = generateJSX();

    setFieldsetJSX(component);
  }, [object]);

  useEffect(() => {
    if (
      object.cep &&
      object.cep.length === 8 &&
      (object.cidade === "" || object.cidade === null) &&
      (object.uf === "" || object.uf === null)
    ) {
      const fetchCepData = async () => {
        try {
          const response = await fetch(
            `https://viacep.com.br/ws/${object.cep}/json`
          );
          if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
          }
          const data = await response.json();

          if (data.uf) {
            setObject((prevState) => ({
              ...prevState,
              uf: data.uf,
            }));
          }

          if (data.localidade) {
            setObject((prevState) => ({
              ...prevState,
              cidade: data.localidade,
            }));
          }
        } catch (error) {
          throw new Error(`Erro na requisição: ${error}`);
        }
      };

      fetchCepData();
    }
  }, [object.cep]);

  const handleButtonClick = () => {
    if (
      object.cep !== "" &&
      object.cidade !== "" &&
      object.uf !== "" &&
      object.numero !== "" &&
      object.bairro !== "" &&
      object.endereco !== ""
    ) {
      const data = {
        id: paramsCnpj,
        ...object,
      };

      setType("Message");

      UPDATE_Localizacao(data);
    } else {
      setType("Message");
      setModal("InformacoesInvalidas");
    }
  };

  return (
    <>
      <ModalStructure>
        <Text
          variant="h1"
          icon={faBuilding}
          fontText="Credenciamento cliente"
        />
        <div className="cliente__progress-bar">
          <ProgressBar variant="Cliente" id={paramsCnpj} />
        </div>
        <div className="cliente__structure">
          <header className="cliente__structure__header">
            <h2 className="heading--secondary">Situação:</h2>
            <h3 className="heading--tertiary">
              {register.Status === "" ? "Sem cadastro" : register.Status}
            </h3>
            {register.Credenciador !== "" && (
              <>
                <h2 className="heading--secondary">Credenciador:</h2>
                <h3 className="heading--tertiary">{`${register.Credenciador} - ${register["Data criação"]}`}</h3>
              </>
            )}
            {matriz.cnpj !== "" && (
              <>
                <h2 className="heading--secondary">Matriz:</h2>
                <Link
                  to={`/credenciamento/cliente/identificacao/${matriz.cnpj}`}
                  style={{
                    color: "$color-primary",
                    textUnderlineOffset: "0.25rem",
                  }}
                >
                  <h3 className="heading--tertiary">{`${cnpjMask(
                    matriz.cnpj
                  )} - ${matriz.razaoSocial}`}</h3>
                </Link>
              </>
            )}
          </header>
        </div>
        {status ? (
          <>
            <div className="cliente__structure">
              <h4 className="heading--quarternary">Localização do cliente</h4>
              {fieldsetJSX}
            </div>
            {register.Credenciador === `${profile.nome}(${profile.usuario})` &&
            (status === "Desenvolvimento" ||
              status === "Exclusão reprovada" ||
              status === "Reprovado" ||
              status === "Retornado") ? (
              <div className="cliente__button">
                <Button
                  variant="sucess"
                  fontText="Salvar"
                  icon={faCheck}
                  onClick={handleButtonClick}
                />
              </div>
            ) : null}
          </>
        ) : (
          <TableEmpty />
        )}
      </ModalStructure>
      <div className="modal-box-overlay" aria-hidden={modal.type !== ""}>
        {modal.type === "Message" ? ModalMessage() : null}
      </div>
    </>
  );
};

export default ClienteLocalizacao;
