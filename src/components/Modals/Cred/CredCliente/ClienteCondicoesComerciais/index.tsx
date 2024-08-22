import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  faBuilding,
  faCheck,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import ModalStructure from "../../../Structure";
import Text from "../../../../Text";
import Dropdown from "../../../../Dropdown";
import Select from "../../../../Select";
import Input from "../../../../Input";
import Icon from "../../../../Icon";
import Button from "../../../../Button";
import ProgressBar from "../../../../ProgressBar";
import DropdownData from "../../../../../utility/DropdownData";
import getData from "../../../../../api/Restfull/get";
import Table from "../../../../Table";
import TableEmpty from "../../../../Table/Empty";
import deleteData from "../../../../../api/Restfull/delete";
import useCookies from "../../../../../storage/Cookies";
import ModalMessage from "../../../../../utility/ModalMessage";
import { useModalContext } from "../../../../../hooks/context/useModalContext";
import useCredenciamentoCliente from "../../../../../hooks/operators/useCliente";
import useFormatter from "../../../../../hooks/useFormatter";
import useMask from "../../../../../hooks/useMask";

interface IClienteAPI {
  id: string;
  cliente: string;
  produto: number;
  tipoPagamento: string;
  faturamento: string;
  rede: string;
  saqueIncluso: boolean;
  apuracao: number;
  pagamento: number;
  taxa: number;
  limite: number;
  adesao: number;
  emissao: number;
  segundaVia: number;
}

interface ICliente {
  Produto: string;
  "Tipo pagamento": string;
  Faturamento: string;
  Rede: string;
  "Saque incluso?": boolean | string;
  Apuração: number;
  Pagamento: number;
  Taxa: number | string;
  Limite: number | string;
  Adesão: number | string;
  Emissão: number | string;
  "Segunda via": number | string;
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

const ClienteCondicoesComerciais = () => {
  const [condicoesComerciais, setCondicoesComerciais] = useState<ICliente[]>(
    []
  );
  const [initialCondicoesComerciais, setInitialCondicoesComerciais] = useState<
    ICliente[]
  >([]);
  const [status, setStatus] = useState();
  const params = useParams();
  const paramsCnpj = params.cnpj!;
  const { GET_Profile } = useCookies();
  const profile = GET_Profile();
  const { modal } = useModalContext();
  const [produtos, setProdutos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [tableJSX, setTableJSX] = useState<JSX.Element | null>(null);
  const [fieldsetJSX, setFieldsetJSX] = useState<JSX.Element | null>(null);
  const [keyVersion, setKeyVersion] = useState(0);
  const {
    parseCurrencyToNumber,
    parseToReal,
    parseToPercentual,
    parsePercentualToNumber,
  } = useFormatter();
  const { ADD_CondicaoComercial, UPDATE_CondicaoComercial } =
    useCredenciamentoCliente();
  const { cnpjMask } = useMask();
  const [windowWidth] = useState(window.innerWidth);

  const initialObject: ICliente = {
    Produto: "",
    "Tipo pagamento": "",
    Faturamento: "Pré-pago",
    Rede: "Rede aberta",
    "Saque incluso?": false,
    Apuração: 15,
    Pagamento: 0,
    Taxa: 0,
    Limite: 0,
    Adesão: 0,
    Emissão: 0,
    "Segunda via": 0,
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

  const [object, setObject] = useState(initialObject);
  const [register, setRegister] = useState<IRegister>(initialRegister);
  const [matriz, setMatriz] = useState<IMatriz>(initialMatriz);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData("produtos");
        setProdutos(result);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const condicoesComerciais = await getData(
        "credenciamentos/clientes/condicoes-comerciais",
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

      if (condicoesComerciais.length > 0) {
        condicoesComerciais.forEach((condicao: any) => {
          delete condicao["Nome fantasia"];
          delete condicao["CNPJ"];

          condicao.Adesão = parseToReal(condicao.Adesão);
          condicao.Emissão = parseToReal(condicao.Emissão);
          condicao.Limite = parseToReal(condicao.Limite);
          condicao["Segunda via"] = parseToReal(condicao["Segunda via"]);
          condicao.Taxa = parseToPercentual(condicao.Taxa);

          if (condicao["Saque incluso?"] === false) {
            condicao["Saque incluso?"] = "Não";
          } else {
            condicao["Saque incluso?"] = "Sim";
          }
        });

        setCondicoesComerciais(condicoesComerciais);
        setInitialCondicoesComerciais(condicoesComerciais);
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

  useEffect(() => {
    const generateTableJSX = () => {
      if (condicoesComerciais.length > 0) {
        setKeyVersion((prev) => prev + 1);
        return (
          <Table
            key={keyVersion + 1}
            header={Object.keys(condicoesComerciais[0])}
            response={condicoesComerciais.map((obj: any) => Object.values(obj))}
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
  }, [register, condicoesComerciais]);

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
              <div className="cliente__structure">
                <h4 className="heading--quarternary">Benefício</h4>
                <form className="cliente__structure__form">
                  {loading ? (
                    <div>Carregando produtos...</div>
                  ) : (
                    <Dropdown
                      options={DropdownData(true, produtos, "Produto")}
                      fontText="Produto"
                      onChange={(option: any) => {
                        setObject((prevState) => ({
                          ...prevState,
                          Produto: option.text,
                        }));
                      }}
                      value={object["Produto"]}
                      size={windowWidth <= 480 ? "xl" : "md"}
                    />
                  )}
                  <div className="cliente__structure__selects">
                    <div className="select__box">
                      <p>Faturamento</p>
                      <Select
                        options={["Pré-pago", "Pós-pago"]}
                        optionDefault={object["Faturamento"]}
                        onSelectChange={(option: string) =>
                          setObject((prevState) => ({
                            ...prevState,
                            Faturamento: option,
                          }))
                        }
                      />
                    </div>
                    <div className="select__box">
                      <p>Saque</p>
                      <Select
                        options={["Com saque", "Sem saque"]}
                        optionDefault={
                          object["Saque incluso?"] ? "Com saque" : "Sem saque"
                        }
                        onSelectChange={(option: string) =>
                          setObject((prevState) => ({
                            ...prevState,
                            "Saque incluso?":
                              option === "Com saque" ? true : false,
                          }))
                        }
                      />
                    </div>
                    <div className="select__box">
                      <p>Rede</p>
                      <Select
                        options={["Rede aberta", "Rede fechada"]}
                        optionDefault={object["Rede"]}
                        onSelectChange={(option: string) =>
                          setObject((prevState) => ({
                            ...prevState,
                            Rede: option,
                          }))
                        }
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div className="cliente__structure">
                <h4 className="heading--quarternary">
                  Período de apuração e pagamento
                </h4>
                <form className="cliente__structure__form">
                  <div className="select__box">
                    <p>Apuração (dias)</p>
                    <Select
                      options={[15, 30]}
                      optionDefault={object.Apuração}
                      onSelectChange={(option: number) =>
                        setObject((prevState) => ({
                          ...prevState,
                          Apuração: option,
                        }))
                      }
                    />
                  </div>
                  <Input
                    type="text"
                    characters="number"
                    label="Pagamento (dias)"
                    value={object["Pagamento"]}
                    placeholder="0"
                    length={[3]}
                    onChange={(valor: any[]) =>
                      setObject((prevState) => ({
                        ...prevState,
                        Pagamento: Math.floor(valor[0]),
                      }))
                    }
                  />
                </form>
              </div>
              <div className="cliente__structure">
                <h4 className="heading--quarternary">Taxas</h4>
                <form className="cliente__structure__form">
                  <Dropdown
                    options={DropdownData(false, ["Boleto", "Depósito", "Pix"])}
                    onChange={(option: any) => {
                      setObject((prevState) => ({
                        ...prevState,
                        "Tipo pagamento": option.text,
                      }));
                    }}
                    value={object["Tipo pagamento"]}
                    fontText="Forma pagamento"
                    size={windowWidth <= 480 ? "xl" : "md"}
                  />
                  <Input
                    type="number"
                    label="Administrativa (%)"
                    placeholder="0,00"
                    value={object["Taxa"]}
                    onChange={(valor: any[]) => {
                      setObject((prevState) => ({
                        ...prevState,
                        Taxa: valor[0],
                      }));
                    }}
                    size={windowWidth <= 480 ? "xl" : "md"}
                  />
                  <Input
                    type="number"
                    label="Limite (R$)"
                    placeholder="0,00"
                    value={object["Limite"]}
                    onChange={(valor: any[]) =>
                      setObject((prevState) => ({
                        ...prevState,
                        Limite: valor[0],
                      }))
                    }
                    size={windowWidth <= 480 ? "xl" : "md"}
                  />
                  <Input
                    type="number"
                    label="Adesão (R$)"
                    placeholder="0,00"
                    value={object["Adesão"]}
                    onChange={(valor: any[]) =>
                      setObject((prevState) => ({
                        ...prevState,
                        Adesão: valor[0],
                      }))
                    }
                    size={windowWidth <= 480 ? "xl" : "md"}
                  />
                  <Input
                    type="number"
                    label="Emissão cartão (R$)"
                    placeholder="0,00"
                    value={object["Emissão"]}
                    onChange={(valor: any[]) =>
                      setObject((prevState) => ({
                        ...prevState,
                        Emissão: valor[0],
                      }))
                    }
                    size={windowWidth <= 480 ? "xl" : "md"}
                  />
                  <Input
                    type="number"
                    label="Segunda via (R$)"
                    placeholder="0,00"
                    value={object["Segunda via"]}
                    onChange={(valor: any[]) =>
                      setObject((prevState) => ({
                        ...prevState,
                        "Segunda via": valor[0],
                      }))
                    }
                    size={windowWidth <= 480 ? "xl" : "md"}
                  />
                  {windowWidth <= 480 ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        width: "100%",
                      }}
                    >
                      <Button
                        fontText="Adicionar"
                        onClick={() => insertArray()}
                      />
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
                </form>
              </div>
            </>
          ) : null}
        </>
      );
    };

    const component = generateJSX();

    setFieldsetJSX(component);
  }, [object, produtos, loading, status]);

  const validInsertion = () => {
    let isValid = true;

    const lista = condicoesComerciais;
    lista.forEach((item: ICliente) => {
      if (item["Produto"] === object["Produto"]) {
        isValid = false;
      }
    });

    if (
      object["Produto"] === "" ||
      object["Tipo pagamento"] === "" ||
      object["Faturamento"] === "" ||
      object["Rede"] === "" ||
      object["Apuração"] === undefined ||
      object["Pagamento"] <= 0
    ) {
      isValid = false;
    }
    return isValid;
  };

  const insertArray = () => {
    const isValid = validInsertion();
    let lista: any = [...condicoesComerciais];

    if (isValid) {
      object["Saque incluso?"] =
        object["Saque incluso?"] === true ? "Sim" : "Não";
      object.Adesão = parseToReal(object.Adesão);
      object.Emissão = parseToReal(object.Emissão);
      object.Limite = parseToReal(object.Limite);
      object["Segunda via"] = parseToReal(object["Segunda via"]);
      object.Taxa = parseToPercentual(object.Taxa);

      lista.push(object);
      setCondicoesComerciais(lista);
      setObject({ ...initialObject });
    }
  };

  const editArray = (data: any[]) => {
    let lista: any = [...condicoesComerciais];
    lista = lista.filter((item: ICliente) => item["Produto"] !== data[0]);

    setCondicoesComerciais(lista);
    setObject((prevState) => ({ ...prevState, Produto: data[0] }));
    setObject((prevState) => ({ ...prevState, "Tipo pagamento": data[1] }));
    setObject((prevState) => ({ ...prevState, Faturamento: data[2] }));
    setObject((prevState) => ({ ...prevState, Rede: data[3] }));
    setObject((prevState) => ({ ...prevState, "Saque incluso?": data[4] }));
    setObject((prevState) => ({ ...prevState, Apuração: data[5] }));
    setObject((prevState) => ({ ...prevState, Pagamento: data[6] }));
    setObject((prevState) => ({
      ...prevState,
      Taxa: parsePercentualToNumber(data[7]),
    }));
    setObject((prevState) => ({
      ...prevState,
      Limite: parseCurrencyToNumber(data[8]),
    }));
    setObject((prevState) => ({
      ...prevState,
      Adesão: parseCurrencyToNumber(data[9]),
    }));
    setObject((prevState) => ({
      ...prevState,
      Emissão: parseCurrencyToNumber(data[10]),
    }));
    setObject((prevState) => ({
      ...prevState,
      "Segunda via": parseCurrencyToNumber(data[11]),
    }));
  };

  const handleClick = () => {
    let analized: ICliente[] = [];
    let pendingAnalysis: ICliente[] = [];

    condicoesComerciais.forEach((condicao: ICliente) => {
      analized.push(condicao);

      const dataAPI: IClienteAPI = {
        id: paramsCnpj,
        cliente: paramsCnpj,
        produto: findProduto(condicao["Produto"]),
        tipoPagamento: condicao["Tipo pagamento"],
        faturamento: condicao["Faturamento"],
        rede: condicao["Rede"],
        saqueIncluso: condicao["Saque incluso?"] === "Sim" ? true : false,
        apuracao: condicao["Apuração"],
        pagamento: condicao["Pagamento"],
        taxa: parsePercentualToNumber(String(condicao["Taxa"])),
        limite: parseCurrencyToNumber(String(condicao["Limite"])),
        adesao: parseCurrencyToNumber(String(condicao["Adesão"])),
        emissao: parseCurrencyToNumber(String(condicao["Emissão"])),
        segundaVia: parseCurrencyToNumber(String(condicao["Segunda via"])),
      };

      const isNew = isNewCondicao(condicao);

      if (!isNew) {
        const initialCondicao = initialCondicoesComerciais.filter(
          (item: ICliente) => {
            return item === condicao;
          }
        );

        if (initialCondicao.length === 0) {
          UPDATE_CondicaoComercial(dataAPI);
        }
      } else {
        ADD_CondicaoComercial(dataAPI);
      }
    });

    pendingAnalysis = initialCondicoesComerciais.filter(
      (condicao: ICliente) => {
        return !analized.some((analysis: ICliente) => {
          return analysis["Produto"] === condicao["Produto"];
        });
      }
    );

    if (pendingAnalysis.length > 0) {
      pendingAnalysis.forEach((condicao: ICliente) => {
        const fetch = async () => {
          await deleteData(
            "/credenciamentos/clientes/condicoes-comerciais",
            `${paramsCnpj}?produto=${findProduto(condicao.Produto)}`
          );
        };
        fetch();
      });
    }
  };

  const isNewCondicao = (newCondicao: ICliente) => {
    let isNew = true;

    initialCondicoesComerciais.forEach((condicao: ICliente) => {
      if (condicao["Produto"] === newCondicao["Produto"]) {
        isNew = false;
      }
    });

    return isNew;
  };

  const findProduto = (value: string) => {
    const produto: { id: number; Produto: string }[] = produtos.filter(
      (item: { id: number; Produto: string }) => {
        return item["Produto"] === value;
      }
    );

    return produto[0]["id"];
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
                <h3 className="heading--tertiary">
                  {`${register.Credenciador} - ${register["Data criação"]}`}
                </h3>
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
                  <h3 className="heading--teritary">{`${cnpjMask(
                    matriz.cnpj
                  )} - ${matriz.razaoSocial}`}</h3>
                </Link>
              </>
            )}
          </header>
        </div>
        {status ? (
          <>
            {fieldsetJSX}
            <div className="cliente__structure">
              <h4 className="heading--quarternary">Condições comerciais</h4>
            </div>
            {tableJSX}
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
                  onClick={handleClick}
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

export default ClienteCondicoesComerciais;
