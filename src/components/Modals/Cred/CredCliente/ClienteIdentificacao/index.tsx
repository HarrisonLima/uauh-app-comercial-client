import { Link, useParams } from "react-router-dom";
import { useModalContext } from "../../../../../hooks/context/useModalContext";
import { useEffect, useState } from "react";
import { faBuilding, faCheck } from "@fortawesome/free-solid-svg-icons";
import useCredenciamentoCliente from "../../../../../hooks/operators/useCliente";
import ModalStructure from "../../../Structure";
import Text from "../../../../Text";
import Select from "../../../../Select";
import Input from "../../../../Input";
import Button from "../../../../Button";
import ProgressBar from "../../../../ProgressBar";
import getData from "../../../../../api/Restfull/get";
import isValidCnpj from "../../../../../validators/isValidCnpj";
import ModalMessage from "../../../../../utility/ModalMessage";
import useCookies from "../../../../../storage/Cookies";
import useMask from "../../../../../hooks/useMask";

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
  emailFinanceiro: string;
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

const ClienteIdentificacao = () => {
  const params = useParams();
    const paramsCnpj = params.cnpj ? params.cnpj : "";
  const { GET_Profile } = useCookies();
  const profile = GET_Profile();
  const [isValid, setIsValid] = useState(true);
  const [status, setStatus] = useState();
  const [hasRegister, setHasRegister] = useState(false);
  const [fieldsetJSX, setFieldsetJSX] = useState<JSX.Element | null>(null);
  const { ADD_Identificacao, UPDATE_Identificacao } =
    useCredenciamentoCliente();
  const { modal, setType, setModal } = useModalContext();
  const [windowWidth] = useState(window.innerWidth);
  const { cnpjMask } = useMask();

  const initialCliente: ICliente = {
    cnpj: paramsCnpj,
    orgaoPublico: true,
    simplesNacional: true,
    razaoSocial: "",
    inscricaoEstadual: "",
    ramoAtividade: "",
    nomeFantasia: "",
    telefone: "",
    email: "",
    emailFinanceiro: "",
  };

  const initialRegister: IRegister = {
    Status: "",
    Aprovador: "",
    Credenciador: "",
    ["Data criação"]: "",
    ["Data aprovação"]: "",
  };

  const initialMatriz: IMatriz = {
    cnpj: "",
    razaoSocial: "",
  };

  const [object, setObject] = useState<ICliente>(initialCliente);
  const [register, setRegister] = useState<IRegister>(initialRegister);
  const [matriz, setMatriz] = useState<IMatriz>(initialMatriz);

  useEffect(() => {
    const fetch = async () => {
      const cliente = await getData(
        "credenciamentos/clientes/identificacoes",
        paramsCnpj
      );

      if (cliente.length > 0) {
        const status = await getData(
          "credenciamentos/clientes/status",
          paramsCnpj
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
        setHasRegister(true);

        const updatedCliente = {
          cnpj: paramsCnpj,
          orgaoPublico: cliente[0]["Órgão público"],
          simplesNacional: cliente[0]["Simples nacional"],
          razaoSocial: cliente[0]["Razão social"],
          inscricaoEstadual: cliente[0]["Inscrição estadual"],
          ramoAtividade: cliente[0]["Ramo atividade"],
          nomeFantasia: cliente[0]["Nome fantasia"],
          telefone: cliente[0]["Telefone"],
          email: cliente[0]["E-mail"],
          emailFinanceiro: cliente[0]["E-mail financeiro"],
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

  const isInputValid =
    (register.Credenciador &&
      register.Credenciador !== `${profile.nome}(${profile.usuario})`) ||
    (status !== "Desenvolvimento" &&
      status !== "Exclusão reprovada" &&
      status !== "Reprovado" &&
      status !== "Retornado" &&
      status !== undefined);

  useEffect(() => {
    const generateJSX = () => {
      return (
        <>
          <div className="cliente__structure__selects">
            <div className="select__box">
              <p>Órgão público</p>
              <Select
                options={["Sim", "Não"]}
                optionDefault={object.orgaoPublico ? "Sim" : "Não"}
                onSelectChange={(option: string) =>
                  setObject((prevState) => ({
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
                optionDefault={object.simplesNacional ? "Sim" : "Não"}
                onSelectChange={(option: string) =>
                  setObject((prevState) => ({
                    ...prevState,
                    simplesNacional: option === "Sim" ? true : false,
                  }))
                }
              />
            </div>
          </div>
          <form className="cliente__structure__form">
            <Input
              size={windowWidth <= 480 ? "xl" : "lg"}
              type="text"
              characters="text"
              label="Razão social"
              length={[80]}
              placeholder="Digite a razão social..."
              value={object.razaoSocial}
              isDisabled={isInputValid}
              onChange={(valor: any[]) =>
                setObject((prevState) => ({
                  ...prevState,
                  razaoSocial: valor[0],
                }))
              }
            />
            <Input
              size={windowWidth <= 480 ? "xl" : "lg"}
              type="text"
              characters="all"
              label="Nome fantasia"
              placeholder="Digite o nome fantasia..."
              value={object.nomeFantasia}
              isDisabled={isInputValid}
              onChange={(valor: any[]) =>
                setObject((prevState) => ({
                  ...prevState,
                  nomeFantasia: valor[0],
                }))
              }
            />
            <Input
              size={windowWidth <= 480 ? "xl" : "lg"}
              type="text"
              characters="text"
              label="Inscrição estadual (opcional)"
              placeholder="Digite a inscrição estadual..."
              value={object.inscricaoEstadual}
              isDisabled={isInputValid}
              onChange={(valor: any[]) =>
                setObject((prevState) => ({
                  ...prevState,
                  inscricaoEstadual: valor[0].replace(/[-/."]/g, ""),
                }))
              }
            />
            <Input
              size={windowWidth <= 480 ? "xl" : "lg"}
              type="text"
              characters="text"
              label="Ramo de atividade"
              placeholder="Digite o ramo de atividade..."
              value={object.ramoAtividade}
              isDisabled={isInputValid}
              onChange={(valor: any[]) =>
                setObject((prevState) => ({
                  ...prevState,
                  ramoAtividade: valor[0],
                }))
              }
            />
            <Input
              size={windowWidth <= 480 ? "xl" : "lg"}
              type="text"
              characters="value"
              validationType="Telefone"
              label="Telefone"
              placeholder="+55 (00) 0000-0000"
              value={object.telefone}
              isDisabled={isInputValid}
              onChange={(valor: any[]) =>
                setObject((prevState) => ({ ...prevState, telefone: valor[0] }))
              }
            />
            <Input
              size={windowWidth <= 480 ? "xl" : "lg"}
              type="email"
              characters="all"
              label="E-mail comercial"
              placeholder="email_exemplo@gmail.com"
              value={object.email}
              isDisabled={isInputValid}
              onChange={(valor: any[]) =>
                setObject((prevState) => ({
                  ...prevState,
                  email: valor[0],
                }))
              }
            />
            <Input
              size={windowWidth <= 480 ? "xl" : "lg"}
              type="email"
              characters="all"
              label="E-mail financeiro"
              placeholder="email_exemplo@gmail.com"
              value={object.emailFinanceiro}
              isDisabled={isInputValid}
              onChange={(valor: any[]) =>
                setObject((prevState) => ({
                  ...prevState,
                  emailFinanceiro: valor[0],
                }))
              }
            />
          </form>
        </>
      );
    };

    const component = generateJSX();

    setFieldsetJSX(component);
  }, [object, status]);

  const handleButtonClick = () => {
    if (
      object.razaoSocial !== "" &&
      object.nomeFantasia !== "" &&
      object.ramoAtividade !== "" &&
      object.telefone !== "" &&
      object.email !== ""
    ) {
      const data = {
        id: paramsCnpj,
        ...object,
      };

      setType("Message");
      hasRegister ? UPDATE_Identificacao(data) : ADD_Identificacao(data);
    } else {
      setType("Message");
      setModal("InformacoesInvalidas");
    }
  };

  useEffect(() => {
    setIsValid(isValidCnpj(paramsCnpj));
  }, []);

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
        {isValid && (
          <>
            <div className="cliente__structure">
              <h4 className="heading--quarternary">Informações do cliente</h4>
              {fieldsetJSX}
            </div>
            {status === undefined ||
            (register.Credenciador === `${profile.nome}(${profile.usuario})` &&
              (status === "Desenvolvimento" ||
                status === "Exclusão reprovada" ||
                status === "Reprovado" ||
                status === "Retornado")) ? (
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
        )}
      </ModalStructure>
      <div className="modal-box-overlay" aria-hidden={modal.type !== ""}>
        {modal.type === "Message" ? ModalMessage() : null}
      </div>
    </>
  );
};

export default ClienteIdentificacao;
