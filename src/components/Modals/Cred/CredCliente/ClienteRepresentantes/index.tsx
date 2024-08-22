import { Link, useParams } from "react-router-dom";
import { useModalContext } from "../../../../../hooks/context/useModalContext";
import { useEffect, useState } from "react";
import {
  faBuilding,
  faCheck,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import useCredenciamentoCliente from "../../../../../hooks/operators/useCliente";

import ModalStructure from "../../../Structure";
import Text from "../../../../Text";
import Input from "../../../../Input";
import Select from "../../../../Select";
import Icon from "../../../../Icon";
import Button from "../../../../Button";
import ProgressBar from "../../../../ProgressBar";
import getData from "../../../../../api/Restfull/get";
import Table from "../../../../Table";
import TableEmpty from "../../../../Table/Empty";
import deleteData from "../../../../../api/Restfull/delete";
import ModalMessage from "../../../../../utility/ModalMessage";
import useCookies from "../../../../../storage/Cookies";
import useMask from "../../../../../hooks/useMask";

interface ICliente {
  Nome: string;
  CPF: string;
  "Contato comercial?": string;
  "Testemunha?": string;
  "E-mail": string;
  Telefone: string;
  Cargo: string;
}

interface IClienteAPI {
  id: number | string;
  cliente: string;
  nome: string;
  cpf: string;
  contatoComercial: boolean;
  testemunha: boolean;
  email: string;
  telefone: string;
  cargo: string;
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

const ClienteRepresentantes = () => {
  const [status, setStatus] = useState();
  const params = useParams();
  const paramsCnpj = params.cnpj ? params.cnpj : "";
  const { GET_Profile } = useCookies();
  const profile = GET_Profile();
  const [representantes, setRepresentantes] = useState<ICliente[]>([]);
  const [initialRepresentantes, setInitialRepresentantes] = useState<
    ICliente[]
  >([]);
  const [tableJSX, setTableJSX] = useState<JSX.Element | null>(null);
  const [fieldsetJSX, setFieldsetJSX] = useState<JSX.Element | null>(null);
  const [keyVersion, setKeyVersion] = useState(0);
  const { modal, setType, setModal } = useModalContext();
  const { ADD_Representante, UPDATE_Representante } =
    useCredenciamentoCliente();
  const [windowWidth] = useState(window.innerWidth);
  const { cnpjMask } = useMask();

  useEffect(() => {
    const generateTableJSX = () => {
      if (representantes.length > 0) {
        setKeyVersion((prev) => prev + 1);
        return (
          <Table
            key={keyVersion + 1}
            header={Object.keys(representantes[0])}
            response={representantes.map((obj: any) => Object.values(obj))}
            onEdit={editArray}
            actions={
              register.Credenciador === `${profile.nome}(${profile.usuario})` &&
              (status === "Desenvolvimento" ||
                status === "Exclusão reprovada" ||
                status === "Reprovado" ||
                status === "Retornado")
                ? ["Edit"]
                : undefined
            }
          />
        );
      } else {
        return <TableEmpty />;
      }
    };

    const tableComponent = generateTableJSX();

    setTableJSX(tableComponent);
  }, [representantes]);

  const initialObject: ICliente = {
    Nome: "",
    CPF: "",
    "Contato comercial?": "Não",
    "Testemunha?": "Não",
    "E-mail": "",
    Telefone: "",
    Cargo: "",
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

  const [object, setObject] = useState<ICliente>(initialObject);
  const [register, setRegister] = useState<IRegister>(initialRegister);
  const [matriz, setMatriz] = useState<IMatriz>(initialMatriz);

  useEffect(() => {
    const fetch = async () => {
      const representantes = await getData(
        "credenciamentos/clientes/representantes",
        paramsCnpj
      );

      const status = await getData(
        "credenciamentos/clientes/status",
        paramsCnpj.replace(/[^\d]+/g, "")
      );

      if (status.length > 0) {
        const newRegister = {
          Status: status[0]["Status"],
          Aprovador: status[0]["Aprovador"],
          Credenciador: status[0]["Credenciador"],
          ["Data criação"]: status[0]["Data de criação"],
          ["Data aprovação"]: status[0]["Data de aprovação"],
        };

        setStatus(status[0]["Status"]);
        setRegister(newRegister);
      }

      if (representantes.length > 0) {
        representantes.forEach((representante: any) => {
          delete representante["Nome fantasia"];
          delete representante["CNPJ"];

          if (representante["Contato comercial?"] === false) {
            representante["Contato comercial?"] = "Não";
          } else {
            representante["Contato comercial?"] = "Sim";
          }

          if (representante["Testemunha?"] === false) {
            representante["Testemunha?"] = "Não";
          } else {
            representante["Testemunha?"] = "Sim";
          }
        });
        setInitialRepresentantes(representantes);
        setRepresentantes(representantes);
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
      status !== "Retornado");

  useEffect(() => {
    const generateJSX = () => {
      return (
        <>
          {register.Credenciador === `${profile.nome}(${profile.usuario})` &&
          (status === "Desenvolvimento" ||
            status === "Exclusão reprovada" ||
            status === "Reprovado" ||
            status === "Retornado") ? (
            <>
              <Input
                type="text"
                characters="text"
                label="Nome completo"
                placeholder="Digite o nome completo..."
                value={object.Nome}
                isDisabled={isInputValid}
                size={windowWidth <= 480 ? "xl" : "lg"}
                onChange={(valor: any[]) =>
                  setObject((prevState) => ({ ...prevState, Nome: valor[0] }))
                }
              />
              <Input
                type="text"
                characters="value"
                validationType="CPF"
                label="CPF"
                placeholder="000.000.000-00"
                value={object.CPF}
                size={windowWidth <= 480 ? "xl" : "lg"}
                isDisabled={isInputValid}
                onChange={(valor: any[]) =>
                  setObject((prevState) => ({ ...prevState, CPF: valor[0] }))
                }
              />
              <div className="select__box">
                <p>Contato comercial</p>
                <Select
                  options={["Sim", "Não"]}
                  optionDefault={object["Contato comercial?"]}
                  onSelectChange={(option: string) =>
                    setObject((prevState) => ({
                      ...prevState,
                      "Contato comercial?": option,
                    }))
                  }
                />
              </div>
              <div className="select__box">
                <p>Testemunha</p>
                <Select
                  options={["Sim", "Não"]}
                  optionDefault={object["Testemunha?"]}
                  onSelectChange={(option: string) =>
                    setObject((prevState) => ({
                      ...prevState,
                      "Testemunha?": option,
                    }))
                  }
                />
              </div>
              <Input
                type="email"
                characters="all"
                label="E-mail"
                placeholder="email_exemplo@gmail.com"
                value={object["E-mail"]}
                isDisabled={isInputValid}
                size={windowWidth <= 480 ? "xl" : "lg"}
                onChange={(valor: any[]) =>
                  setObject((prevState) => ({
                    ...prevState,
                    ["E-mail"]: valor[0],
                  }))
                }
              />
              <Input
                type="text"
                characters="value"
                validationType="Telefone"
                label="Telefone"
                placeholder="+55 (00) 0000-0000"
                value={object.Telefone}
                size={windowWidth <= 480 ? "xl" : "lg"}
                isDisabled={isInputValid}
                onChange={(valor: any[]) =>
                  setObject((prevState) => ({
                    ...prevState,
                    Telefone: valor[0],
                  }))
                }
              />
              <Input
                type="text"
                characters="text"
                label="Cargo"
                placeholder="Digite o cargo..."
                value={object.Cargo}
                size={windowWidth <= 480 ? "xl" : "lg"}
                isDisabled={isInputValid}
                onChange={(valor: any[]) =>
                  setObject((prevState) => ({
                    ...prevState,
                    Cargo: valor[0],
                  }))
                }
              />
              {windowWidth <= 480 ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "100%",
                  }}
                >
                  <Button fontText="Adicionar" onClick={() => insertArray()} />
                </div>
              ) : (
                <span className="cliente__structure__icon">
                  <Icon
                    icon={faCirclePlus}
                    variant="button"
                    onClick={() => insertArray()}
                  />
                </span>
              )}
            </>
          ) : null}
        </>
      );
    };

    const component = generateJSX();

    setFieldsetJSX(component);
  }, [object, status]);

  const validInsertion = () => {
    let isValid = true;

    const lista = representantes;
    lista.forEach((item: ICliente) => {
      if (item["CPF"] === object["CPF"]) {
        isValid = false;
      }
    });

    if (
      object["CPF"] === "" ||
      object["Cargo"] === "" ||
      object["Contato comercial?"] === "" ||
      object["Testemunha?"] === "" ||
      object["E-mail"] === "" ||
      object["Nome"] === "" ||
      object["Telefone"] === ""
    ) {
      isValid = false;
    }
    return isValid;
  };

  const insertArray = () => {
    const isValid = validInsertion();
    const lista: any = [...representantes];
    if (isValid) {
      object.CPF = object.CPF.replace(/[.-]/g, "");
      object.Telefone = object.Telefone.replace(/\+55|\(|\)|-|\s/g, "");

      lista.push(object);
      setRepresentantes(lista);
      setObject({ ...initialObject });
    }
  };

  const editArray = (data: any[]) => {
    let lista: any = [...representantes];
    lista = lista.filter((item: ICliente) => item.CPF !== data[1]);

    setRepresentantes(lista);
    setObject((prevState) => ({ ...prevState, Nome: data[0] }));
    setObject((prevState) => ({ ...prevState, CPF: data[1] }));
    setObject((prevState) => ({ ...prevState, "Contato comercial?": data[2] }));
    setObject((prevState) => ({ ...prevState, "Testemunha?": data[3] }));
    setObject((prevState) => ({ ...prevState, "E-mail": data[4] }));
    setObject((prevState) => ({ ...prevState, Telefone: data[5] }));
    setObject((prevState) => ({ ...prevState, Cargo: data[6] }));
  };

  const handleClick = () => {
    const analized: ICliente[] = [];
    let pendingAnalysis: ICliente[] = [];

    if (representantes.length > 0) {
      representantes.forEach((representante: ICliente) => {
        analized.push(representante);

        const dataAPI: IClienteAPI = {
          id: representante.CPF,
          cliente: paramsCnpj,
          nome: representante.Nome,
          cpf: representante.CPF,
          contatoComercial:
            representante["Contato comercial?"] === "Sim" ? true : false,
          testemunha: representante["Testemunha?"] === "Sim" ? true : false,
          email: representante["E-mail"],
          telefone: representante.Telefone,
          cargo: representante.Cargo,
        };

        const isNew = isNewRepresentante(representante);

        if (!isNew) {
          const initialRepresentante = initialRepresentantes.filter(
            (item: ICliente) => {
              return item === representante;
            }
          );

          if (initialRepresentante.length === 0) {
            const fetch = async () => {
              UPDATE_Representante(dataAPI);
            };
            setType("Message");
            fetch();
          }
        } else {
          const fetch = async () => {
            ADD_Representante(dataAPI);
          };
          setType("Message");
          fetch();
        }
      });

      pendingAnalysis = initialRepresentantes.filter(
        (representante: ICliente) => {
          return !analized.some((analysis: ICliente) => {
            return analysis["CPF"] === representante["CPF"];
          });
        }
      );

      if (pendingAnalysis.length > 0) {
        pendingAnalysis.forEach((representante: ICliente) => {
          const fetch = async () => {
            await deleteData(
              "/credenciamentos/clientes/representantes",
              representante["CPF"]
            );
          };
          fetch();
        });
      }
    } else {
      setType("Message");
      setModal("InformacoesInvalidas");
    }
  };

  const isNewRepresentante = (newRepresentante: ICliente) => {
    let isNew = true;

    initialRepresentantes.forEach((representante: ICliente) => {
      if (representante["CPF"] === newRepresentante["CPF"]) {
        isNew = false;
      }
    });

    return isNew;
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
              <h4 className="heading--quarternary">
                Identificação de representantes
              </h4>
              {register.Credenciador ===
                `${profile.nome}(${profile.usuario})` &&
              (status === "Desenvolvimento" ||
                status === "Exclusão reprovada" ||
                status === "Reprovado" ||
                status === "Retornado") ? (
                <form className="cliente__structure__form">{fieldsetJSX}</form>
              ) : null}
            </div>
            {tableJSX}
            {register.Credenciador === `${profile.nome}(${profile.usuario})` &&
            (status === "Desenvolvimento" ||
              status === "Exclusão reprovada" ||
              status === "Reprovado" ||
              status === "Retornado") ? (
              <div className="cliente__button">
                <Button
                  fontText="Salvar"
                  variant="sucess"
                  icon={faCheck}
                  onClick={() => {
                    handleClick();
                  }}
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

export default ClienteRepresentantes;
