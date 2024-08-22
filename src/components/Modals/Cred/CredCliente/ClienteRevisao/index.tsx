import { Link, useParams } from "react-router-dom";
import { useModalContext } from "../../../../../hooks/context/useModalContext";
import { useEffect, useState } from "react";
import {
  faAnglesRight,
  faBuilding,
  faCheck,
  faCircleXmark,
  faRotateBack,
} from "@fortawesome/free-solid-svg-icons";
import useCookies from "../../../../../storage/Cookies";
import useFormatter from "../../../../../hooks/useFormatter";
import ModalStructure from "../../../Structure";
import Button from "../../../../Button";
import Text from "../../../../Text";
import ProgressBar from "../../../../ProgressBar";
import getData from "../../../../../api/Restfull/get";
import updateData from "../../../../../api/Restfull/update";
import ReproveCredenciamentoCliente from "../../../../../utility/ModalMessage/ReproveCredenciamento";
import TextBox from "../../../../TextBox";
import ModalMessage from "./../../../../../utility/ModalMessage/index";
import DeleteCredenciamentoCliente from "../../../../../utility/ModalMessage/DeleteCredenciamento";
import ReproveDeleteCredenciamentoCliente from "../../../../../utility/ModalMessage/ReproveDeleteCredenciamento";
import ReturnCredenciamentoCliente from "../../../../../utility/ModalMessage/ReturnCredenciamento";
import TransferCredenciamento from "./../../../../../utility/ModalMessage/TransferCredenciamento/index";
import IncluirObservacao from "../../../../../utility/ModalMessage/IncluirObservacao";
import HistoricoCredenciamento from "../../../../../utility/ModalMessage/HistoricoCredenciamento";
import CredenciarFilial from "../../../../../utility/ModalMessage/CredenciarFilial";
import DesvincularFilial from "../../../../../utility/ModalMessage/DesvincularFilial";
import TableEmpty from "../../../../Table/Empty";
import useMask from "../../../../../hooks/useMask";
import useProposta from "../../../../../hooks/useProposta";
interface IIdentificacao {
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

interface ILocalizacao {
  cep: string;
  cidade: string;
  uf: string;
  numero: string;
  bairro: string;
  endereco: string;
  complemento: string;
}

interface IRepresentante {
  nome: string;
  cpf: string;
  contatoComercial: boolean;
  testemunha: boolean;
  email: string;
  telefone: string;
  cargo: string;
}

interface IJustificativa {
  usuario: string;
  nome: string;
  justificativa: string;
  data: string;
}
interface ICondicao {
  produto: string;
  tipoPagamento: string;
  faturamento: string;
  rede: string;
  saqueIncluso: boolean;
  apuracao: number;
  pagamento: number;
  tipoTaxa: string;
  taxa: number;
  limite: number;
  adesao: number;
  emissao: number;
  segundaVia: number;
}

interface IHeader {
  [key: string]: string;
}

interface IStatus {
  aprovador: string;
  credenciador: string;
  dataAprovacao: string;
  dataCriacao: string;
  status: string;
}

interface IObservacao {
  credenciador: string;
  observacao: string;
  data: string;
}

interface IMatriz {
  cnpj: string;
  razaoSocial: string;
}

const ClienteRevisao = () => {
  const params = useParams();
  const paramsCnpj = params.cnpj ? params.cnpj : "";
  const { GET_Profile } = useCookies();
  const profile = GET_Profile();
  const { modal, setModal } = useModalContext();
  const { parseToReal, parseToPercentual } = useFormatter();
  const { cnpjMask, cpfMask, telefoneMask } = useMask();
  const [modalJSX, setModalJSX] = useState<JSX.Element | null>(null);
  const { propostaCliente } = useProposta();

  const initialStatus: IStatus = {
    aprovador: "",
    credenciador: "",
    dataAprovacao: "",
    dataCriacao: "",
    status: "",
  };

  const initialIdentificacao: IIdentificacao = {
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

  const initialLocalizacao: ILocalizacao = {
    cep: "",
    cidade: "",
    uf: "",
    numero: "",
    bairro: "",
    endereco: "",
    complemento: "",
  };

  const initialJustificativa: IJustificativa = {
    usuario: "",
    nome: "",
    justificativa: "",
    data: "",
  };

  const initialObservacao: IObservacao = {
    credenciador: "",
    observacao: "",
    data: "",
  };

  const initialMatriz: IMatriz = {
    cnpj: "",
    razaoSocial: "",
  };

  const [status, setStatus] = useState<IStatus>(initialStatus);
  const [identificacao, setIdentificacao] =
    useState<IIdentificacao>(initialIdentificacao);
  const [localizacao, setLocalizacao] =
    useState<ILocalizacao>(initialLocalizacao);
  const [observacao, setObservacao] = useState<IObservacao>(initialObservacao);
  const [matriz, setMatriz] = useState<IMatriz>(initialMatriz);
  const [representantes, setRepresentantes] = useState<IRepresentante[]>([]);
  const [condicoesComerciais, setCondicoesComerciais] = useState<ICondicao[]>(
    []
  );
  const [justificativa, setJustificativa] =
    useState<IJustificativa>(initialJustificativa);

  useEffect(() => {
    const fetch = async () => {
      const identificacao = await getData(
        "credenciamentos/clientes/identificacoes",
        paramsCnpj
      );

      if (identificacao.length > 0) {
        const status = await getData(
          "credenciamentos/clientes/status",
          paramsCnpj
        );

        const justificativa = await getData(
          "credenciamentos/clientes/justificativas",
          paramsCnpj
        );

        const localizacao = await getData(
          "credenciamentos/clientes/localizacoes",
          paramsCnpj
        );

        const representantes = await getData(
          "credenciamentos/clientes/representantes",
          paramsCnpj
        );

        const condicoesComerciais = await getData(
          "credenciamentos/clientes/condicoes-comerciais",
          paramsCnpj
        );

        const observacao = await getData(
          "credenciamentos/clientes/observacoes",
          paramsCnpj
        );

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

        const updatedStatus = {
          aprovador: status[0]["Aprovador"],
          credenciador: status[0]["Credenciador"],
          dataAprovacao: status[0]["Data de aprovação"],
          dataCriacao: status[0]["Data de criação"],
          status: status[0]["Status"],
        };

        const updatedIdentificacao = {
          orgaoPublico: identificacao[0]["Órgão público"],
          simplesNacional: identificacao[0]["Simples nacional"],
          razaoSocial: identificacao[0]["Razão social"],
          inscricaoEstadual: identificacao[0]["Inscrição estadual"],
          ramoAtividade: identificacao[0]["Ramo atividade"],
          nomeFantasia: identificacao[0]["Nome fantasia"],
          telefone: identificacao[0]["Telefone"],
          email: identificacao[0]["E-mail"],
          emailFinanceiro: identificacao[0]["E-mail financeiro"],
        };

        const updatedLocalizacao = {
          cep: localizacao[0]["CEP"],
          cidade: localizacao[0]["Cidade"],
          uf: localizacao[0]["UF"],
          numero: localizacao[0]["Número"],
          bairro: localizacao[0]["Bairro"],
          endereco: localizacao[0]["Endereço"],
          complemento: localizacao[0]["Complemento"],
        };

        if (observacao.length > 0) {
          const updatedObservacao = {
            credenciador: observacao[0]["Usuário"],
            observacao: observacao[0]["Observação"],
            data: observacao[0]["Data"],
          };

          setObservacao(updatedObservacao);
        }

        if (justificativa.length > 0) {
          const updatedJustificativa = {
            usuario: justificativa[0]["Usuário"],
            nome: justificativa[0]["Nome do Usuário"],
            justificativa: justificativa[0]["Justificativa"],
            data: justificativa[0]["Data"],
          };
          setJustificativa(updatedJustificativa);
        }

        const listaRepresentantes: IRepresentante[] = [];
        representantes.forEach((representante: any) => {
          const updateRepresentante: IRepresentante = {
            nome: representante["Nome"],
            cpf: cpfMask(representante["CPF"]),
            contatoComercial: representante["Contato comercial?"],
            testemunha: representante["Testemunha?"],
            email: representante["E-mail"],
            telefone: telefoneMask(representante["Telefone"]),
            cargo: representante["Cargo"],
          };

          listaRepresentantes.push(updateRepresentante);
        });

        const listaCondicoes: ICondicao[] = [];
        condicoesComerciais.forEach((condicao: any) => {
          const updateCondicao: ICondicao = {
            produto: condicao["Produto"],
            tipoPagamento: condicao["Tipo pagamento"],
            faturamento: condicao["Faturamento"],
            rede: condicao["Rede"],
            saqueIncluso: condicao["Saque incluso?"],
            apuracao: condicao["Apuração"],
            pagamento: condicao["Pagamento"],
            tipoTaxa: condicao["Tipo taxa"],
            taxa: condicao["Taxa"],
            limite: condicao["Limite"],
            adesao: condicao["Adesão"],
            emissao: condicao["Emissão"],
            segundaVia: condicao["Segunda via"],
          };

          listaCondicoes.push(updateCondicao);
        });

        setStatus(updatedStatus);
        setIdentificacao(updatedIdentificacao);
        setLocalizacao(updatedLocalizacao);
        setRepresentantes(listaRepresentantes);
        setCondicoesComerciais(listaCondicoes);
      }
    };
    fetch();
  }, [paramsCnpj]);

  const actions = () => {
    if (status.credenciador === `${profile.nome}(${profile.usuario})`) {
      switch (status.status) {
        case "Desenvolvimento":
        case "Exclusão reprovada":
        case "Reprovado":
        case "Retornado":
          return (
            <>
              <Button
                variant="danger"
                fontText="Excluir registro"
                icon={faCircleXmark}
                onClick={() => {
                  setModal("DeleteCredenciamentoCliente");
                }}
              />
              <Button
                variant="sucess"
                fontText="Enviar aprovação"
                icon={faAnglesRight}
                onClick={async () => {
                  (await updateData(
                    "/credenciamentos/clientes/status",
                    paramsCnpj,
                    {
                      status: "Aguardando aprovação",
                    }
                  ))
                    ? window.location.reload()
                    : null;
                }}
              />
            </>
          );
        case "Em exclusão":
          return (
            <Button
              variant="danger"
              fontText="Cancelar envio"
              icon={faCircleXmark}
              onClick={async () => {
                (await updateData(
                  "/credenciamentos/clientes/status",
                  paramsCnpj,
                  {
                    status: "Desenvolvimento",
                  }
                ))
                  ? window.location.reload()
                  : null;
              }}
            />
          );
        case "Aguardando aprovação":
          return (
            <Button
              variant="danger"
              fontText="Cancelar envio"
              icon={faCircleXmark}
              onClick={async () => {
                (await updateData(
                  "/credenciamentos/clientes/status",
                  paramsCnpj,
                  {
                    status: "Desenvolvimento",
                  }
                ))
                  ? window.location.reload()
                  : null;
              }}
            />
          );
        case "Aprovado":
          return (
            <Button
              variant="alert"
              fontText="Retornar"
              icon={faRotateBack}
              onClick={() => {
                setModal("ReturnCredenciamentoCliente");
              }}
            />
          );
        case "Excluído":
          return (
            <Button
              variant="alert"
              fontText="Retornar"
              icon={faRotateBack}
              onClick={() => {
                setModal("ReturnCredenciamentoCliente");
              }}
            />
          );
      }
    } else {
      switch (profile.perfil) {
        case "Aprovador":
        case "Gerência":
          switch (status.status) {
            case "Aguardando aprovação":
              return (
                <>
                  <Button
                    variant="danger"
                    fontText="Reprovar"
                    icon={faCircleXmark}
                    onClick={() => {
                      setModal("ReprovarCredenciamentoCliente");
                    }}
                  />
                  <Button
                    variant="sucess"
                    fontText="Aprovar"
                    icon={faCheck}
                    onClick={async () => {
                      (await updateData(
                        "/credenciamentos/clientes/status",
                        paramsCnpj,
                        {
                          status: "Aprovado",
                        }
                      ))
                        ? window.location.reload()
                        : null;
                    }}
                  />
                </>
              );
            case "Em exclusão":
              return (
                <>
                  <Button
                    variant="danger"
                    fontText="Reprovar"
                    icon={faCircleXmark}
                    onClick={() => {
                      setModal("ReproveDeleteCredenciamentoCliente");
                    }}
                  />
                  <Button
                    variant="sucess"
                    fontText="Aprovar"
                    icon={faCheck}
                    onClick={async () => {
                      (await updateData(
                        "/credenciamentos/clientes/status",
                        paramsCnpj,
                        {
                          status: "Excluído",
                        }
                      ))
                        ? window.location.reload()
                        : null;
                    }}
                  />
                </>
              );
            case "Aprovado":
              return (
                <Button
                  variant="alert"
                  fontText="Retornar"
                  icon={faRotateBack}
                  onClick={() => {
                    setModal("ReturnCredenciamentoCliente");
                  }}
                />
              );
          }
      }
    }
  };

  const headerBase: IHeader[] = [
    { "Aprovador:": `${justificativa.nome}(${justificativa.usuario})` },
    { "Data:": `${justificativa.data}` },
  ];

  const propsTextBox = () => {
    switch (status.status) {
      case "Em exclusão":
        return {
          header: [
            {
              "Credenciador:": `${justificativa.nome}(${justificativa.usuario})`,
            },
            {
              "Data:": `${justificativa.data}`,
            },
          ],
          theme: "danger",
        };
      case "Excluído":
        return {
          header: [
            {
              "Credenciador:": `${justificativa.nome}(${justificativa.usuario})`,
            },
            {
              "Data:": `${justificativa.data}`,
            },
          ],
          theme: "disabled",
        };
      case "Exclusão reprovada":
        return {
          header: headerBase,
          theme: "danger",
        };
      case "Reprovado":
        return {
          header: headerBase,
          theme: "danger",
        };
      case "Retornado":
        return {
          header: headerBase,
          theme: "alert",
        };
      default:
        return { header: headerBase, theme: "Default" };
    }
  };

  useEffect(() => {
    const generateJSX = () => {
      switch (modal.modal) {
        case "ReprovarCredenciamentoCliente":
          return <ReproveCredenciamentoCliente />;
        case "ReproveDeleteCredenciamentoCliente":
          return <ReproveDeleteCredenciamentoCliente />;
        case "DeleteCredenciamentoCliente":
          return <DeleteCredenciamentoCliente />;
        case "ReturnCredenciamentoCliente":
          return <ReturnCredenciamentoCliente />;
        case "TransferCredenciamento":
          return <TransferCredenciamento />;
        case "ObservarCredenciamento":
          return <IncluirObservacao />;
        case "CredenciarFilial":
          return <CredenciarFilial />;
        case "HistoricoCredenciamento":
          return <HistoricoCredenciamento />;
        case "DesvincularFilial":
          return <DesvincularFilial />;
        default:
          return <></>;
      }
    };

    const component = generateJSX();

    setModalJSX(component);
  }, [modal.modal]);

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
        {status.status !== "" ? (
          <>
            <div className="cliente__structure">
              <header className="cliente__structure__header">
                <h2 className="heading--secondary">Situação:</h2>
                <Text fontText={status.status} variant="h3" />
                {status.credenciador !== "" && (
                  <>
                    <h2 className="heading--secondary">Credenciador:</h2>
                    <Text
                      fontText={`${status.credenciador} - ${status.dataCriacao}`}
                      variant="h3"
                    />
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
                      <Text
                        fontText={`${cnpjMask(matriz.cnpj)} - ${
                          matriz.razaoSocial
                        }`}
                        variant="h3"
                      />
                    </Link>
                  </>
                )}
              </header>
              <div className="cliente__structure__actions">
                <p
                  className="link"
                  onClick={() => setModal("HistoricoCredenciamento")}
                >
                  Histórico
                </p>
                {status.status === "Desenvolvimento" ||
                status.status === "Exclusão reprovada" ||
                status.status === "Retornado" ||
                status.status === "Reprovado" ? (
                  <p
                    className="link"
                    onClick={() => setModal("TransferCredenciamento")}
                  >
                    Remanejar
                  </p>
                ) : null}
                {status.credenciador ===
                  `${profile.nome}(${profile.usuario})` &&
                status.status !== "Aprovado" &&
                status.status !== "Excluído" &&
                status.status !== "Aguardando aprovação" &&
                status.status !== "Em exclusão" ? (
                  <p
                    className="link"
                    onClick={() => setModal("ObservarCredenciamento")}
                  >
                    Observação
                  </p>
                ) : null}
                {matriz.cnpj ||
                (status.status === "Aprovado" &&
                  status.credenciador ===
                    `${profile.nome}(${profile.usuario})`) ? (
                  <p
                    className="link"
                    onClick={() => {
                      if (status.status === "Aprovado") {
                        setModal("CredenciarFilial");
                      } else if (matriz.cnpj !== "") {
                        setModal("DesvincularFilial");
                      }
                    }}
                  >
                    Filial
                  </p>
                ) : null}
                {status.status === "Aprovado" && (
                  <p
                    className="link"
                    onClick={() =>
                      propostaCliente(
                        status,
                        identificacao,
                        localizacao,
                        representantes,
                        condicoesComerciais
                      )
                    }
                  >
                    Exportar proposta
                  </p>
                )}
              </div>
            </div>
            <div className="cliente__structure">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                }}
              >
                {status.status === "Aprovado" ||
                status.status === "Excluído" ? (
                  <TextBox
                    header={[
                      { "Aprovador:": `${status.aprovador}` },
                      { "Data:": `${status.dataAprovacao}` },
                    ]}
                    theme={status.status === "Aprovado" ? "sucess" : "disabled"}
                    noMessage
                  />
                ) : null}
                {status.status === "Em exclusão" ||
                status.status === "Excluído" ||
                status.status === "Exclusão reprovada" ||
                status.status === "Retornado" ||
                status.status === "Reprovado" ? (
                  <TextBox
                    header={propsTextBox()["header"]}
                    content={justificativa.justificativa}
                    theme={propsTextBox()["theme"]}
                  />
                ) : null}
                <form className="cliente__structure__data-sheet">
                  <div className="cliente__structure__data-sheet__card">
                    <div className="cliente__structure__data-sheet__card__header">
                      <p>
                        {`${cnpjMask(paramsCnpj)} - 
                        ${identificacao.razaoSocial}`}
                      </p>
                    </div>
                    <div className="cliente__structure__data-sheet__card__content">
                      <p>Nome fantasia:</p>
                      <p>{identificacao.nomeFantasia}</p>
                      <p>Ramo de atividade:</p>
                      <p>{identificacao.ramoAtividade}</p>
                      <p>Inscrição estadual:</p>
                      <p>{identificacao.inscricaoEstadual}</p>
                      <p>Órgão público:</p>
                      <p>{identificacao.orgaoPublico ? "Sim" : "Não"}</p>
                      <p>Optante simples:</p>
                      <p>{identificacao.simplesNacional ? "Sim" : "Não"}</p>
                      <p>Telefone:</p>
                      <p>{identificacao.telefone}</p>
                      <p>E-mail comercial:</p>
                      <p>{identificacao.email}</p>
                      <p>E-mail financeiro:</p>
                      <p>
                        {identificacao.emailFinanceiro === "" ||
                        identificacao.emailFinanceiro === null
                          ? "N/A"
                          : identificacao.emailFinanceiro}
                      </p>
                    </div>
                  </div>
                  {localizacao.endereco && (
                    <div className="cliente__structure__data-sheet__card">
                      <div className="cliente__structure__data-sheet__card__header">
                        <p>Localização do estabelecimento</p>
                      </div>
                      <div className="cliente__structure__data-sheet__card__content">
                        <p>CEP:</p>
                        <p>{localizacao.cep}</p>
                        <p>Cidade:</p>
                        <p>{`${localizacao.cidade} - ${localizacao.uf}`}</p>
                        <p>Endereço:</p>
                        <p>{`${localizacao.endereco}, ${localizacao.bairro}, nº ${localizacao.numero}`}</p>
                        <p>Complemento:</p>
                        <p>
                          {localizacao.complemento === "" ||
                          localizacao.complemento === null
                            ? "N/A"
                            : localizacao.complemento}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="cliente__structure__data-sheet__cards">
                    {representantes.length > 0 &&
                      representantes.map(
                        (representante: IRepresentante, index) => {
                          return (
                            <div
                              className="cliente__structure__data-sheet__card"
                              key={index}
                            >
                              <div
                                className="cliente__structure__data-sheet__card__header"
                                style={{ textAlign: "center" }}
                              >
                                <p>Representante</p>
                              </div>
                              <div className="cliente__structure__data-sheet__card__content">
                                <p>Nome:</p>
                                <p>{representante.nome}</p>
                                <p>CPF:</p>
                                <p>{representante.cpf}</p>
                                <p>Cargo:</p>
                                <p>{representante.cargo}</p>
                                <p>Comercial:</p>
                                <p>
                                  {representante.contatoComercial
                                    ? "Sim"
                                    : "Não"}
                                </p>
                                <p>Testemunha:</p>
                                <p>
                                  {representante.testemunha ? "Sim" : "Não"}
                                </p>
                                <p>Telefone:</p>
                                <p>{representante.telefone}</p>
                                <p>E-mail:</p>
                                <p>{representante.email}</p>
                              </div>
                            </div>
                          );
                        }
                      )}
                  </div>
                  <div className="cliente__structure__data-sheet__cards">
                    {condicoesComerciais.length > 0 &&
                      condicoesComerciais.map((condicao: ICondicao, index) => {
                        return (
                          <div
                            className="cliente__structure__data-sheet__card"
                            key={index}
                          >
                            <div
                              className="cliente__structure__data-sheet__card__header"
                              style={{ textAlign: "center" }}
                            >
                              <p>Benefícios</p>
                            </div>
                            <div className="cliente__structure__data-sheet__card__content cliente__structure__data-sheet__card__content-dup">
                              <p>Produto:</p>
                              <p>{condicao.produto}</p>
                              <p>Taxa:</p>
                              <p>{parseToPercentual(condicao.taxa)}</p>
                              <p>Rede:</p>
                              <p>{condicao.rede}</p>
                              <p>Faturamento:</p>
                              <p>{condicao.faturamento}</p>
                              <p>Forma pag.:</p>
                              <p>{condicao.tipoPagamento}</p>
                              <p>Saque:</p>
                              <p>{condicao.saqueIncluso ? "Sim" : "Não"}</p>
                              <p>Apuração:</p>
                              <p>{`${condicao.apuracao} dias`}</p>
                              <p>Pagamento:</p>
                              <p>{`${condicao.pagamento} dias`}</p>
                              <p>Adesão:</p>
                              <p>{parseToReal(condicao.adesao)}</p>
                              <p>Limite:</p>
                              <p>{parseToReal(condicao.limite)}</p>
                              <p>Emissão:</p>
                              <p>{parseToReal(condicao.emissao)}</p>
                              <p>Segunda via:</p>
                              <p>{parseToReal(condicao.segundaVia)}</p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                  {observacao.observacao !== "" && (
                    <TextBox
                      header={[
                        {
                          "Credenciador:": `${observacao.credenciador}`,
                        },
                        {
                          "Data:": `${observacao.data}`,
                        },
                      ]}
                      content={observacao.observacao}
                      theme="default"
                    />
                  )}
                </form>
              </div>
            </div>
            {representantes.length > 0 && condicoesComerciais.length > 0 && (
              <div
                className="cliente__button"
                style={{
                  display: `${actions() === undefined ? "none" : "flex"}`,
                }}
              >
                {actions()}
              </div>
            )}
          </>
        ) : (
          <TableEmpty />
        )}
      </ModalStructure>
      <div
        className="modal-box-overlay"
        aria-hidden={modal.modal !== ""}
        style={{ alignItems: "normal" }}
      >
        {modalJSX}
        {modal.modal !== "" && modal.type === "Message" && ModalMessage()}
      </div>
    </>
  );
};

export default ClienteRevisao;
