import { useParams } from "react-router-dom";
import { useModalContext } from "../../../hooks/context/useModalContext";
import { faClock, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import ModalStructure from "../../../components/Modals/Structure";
import Text from "../../../components/Text";
import getData from "../../../api/Restfull/get";
import Icon from "../../../components/Icon";
import useFormatter from "../../../hooks/useFormatter";
import moment from "moment";
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

interface IRegistro {
  item: string;
  titulo: string;
  usuario: string;
  data: string;
}

const HistoricoCredenciamento = () => {
  const params = useParams();
    const paramsCnpj = params.cnpj ? params.cnpj : "";
  const { setModal, setType } = useModalContext();
  const { parseToReal, parseToPercentual } = useFormatter();
  const [registros, setRegistros] = useState<IRegistro[]>([]);
  const { cnpjMask, cpfMask, telefoneMask } = useMask();

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
  };

  const [cliente, setCliente] = useState<ICliente>(initialCliente);

  useEffect(() => {
    const fetch = async () => {
      const cliente = await getData(
        "credenciamentos/clientes/identificacoes",
        paramsCnpj
      );

      const registros = await getData(
        "credenciamentos/clientes/registros",
        paramsCnpj
      );

      if (cliente.length > 0) {
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
        };
        setCliente(updatedCliente);
      }

      if (registros.length > 0) {
        let regs: IRegistro[] = [];

        const regcredenciamentos = registros[0].credenciamento;
        const regstatus = registros[1].status;
        const regjustificativas = registros[2].justificativa;
        const regremanejamentos = registros[3].remanejamento;

        if (regcredenciamentos.length > 0) {
          const listaCredenciamento: IRegistro[] = [];

          regcredenciamentos.forEach((registro: any) => {
            const updateRegistro: IRegistro = {
              item: formattedMessageCredenciamentos(
                registro["Operação"],
                registro.Item
              ),
              titulo: registro["Operação"],
              usuario: registro["Usuário"],
              data: registro["Data"],
            };
            listaCredenciamento.push(updateRegistro);
          });
          regs = regs.concat(listaCredenciamento);
        }

        if (regstatus.length > 0) {
          const listaStatus: IRegistro[] = [];

          regstatus.forEach((registro: any) => {
            const updateRegistro: IRegistro = {
              item: formattedMessageStatus(registro["Status"]),
              titulo: registro["Status"],
              usuario: registro["Usuário"],
              data: registro["Data"],
            };
            listaStatus.push(updateRegistro);
          });
          regs = regs.concat(listaStatus);
        }

        if (regjustificativas.length > 0) {
          const listaJustificativas: IRegistro[] = [];

          regjustificativas.forEach((registro: any) => {
            const updatedRegistro: IRegistro = {
              item: formattedMessageStatus(
                registro["Status"],
                registro["Justificativa"]
              ),
              titulo: registro["Status"],
              usuario: registro["Usuário"],
              data: registro["Data"],
            };
            listaJustificativas.push(updatedRegistro);
          });
          regs = regs.concat(listaJustificativas);
        }

        if (regremanejamentos.length > 0) {
          const listaRemanejamentos: IRegistro[] = [];

          regremanejamentos.forEach((registro: any) => {
            const updatedRegistro: IRegistro = {
              item: `Remanejado credenciamento para o usuário: ${registro["Usuário remanejado"]}. `,
              titulo: "Credenciamento remanejado",
              usuario: registro["Usuário remanejador"],
              data: registro["Data"],
            };
            listaRemanejamentos.push(updatedRegistro);
          });
          regs = regs.concat(listaRemanejamentos);
        }

        regs.sort((a, b) => {
          const dateA = moment(a.data, "HH:mm:ss - DD/MM/YYYY").toDate();
          const dateB = moment(b.data, "HH:mm:ss - DD/MM/YYYY").toDate();
          return dateB.getTime() - dateA.getTime();
        });

        setRegistros(regs);
      }
    };

    fetch();
  }, []);

  const formattedMessageCredenciamentos = (titulo: string, item: any) => {
    const cleanedItem = item
      .replace(/[{}]/g, "")
      .replace(/NULL/g, '""')
      .split('","');
    const processedItem = cleanedItem.map((i: string) => i.replace(/"/g, ""));

    switch (titulo) {
      case "Cadastrado Identificação":
      case "Atualizado Identificação":
        return JSON.stringify({
          ["Órgão público"]: processedItem[1] === true ? "Sim" : "Não",
          ["Simples nacional"]: processedItem[2] === true ? "Sim" : "Não",
          ["CNPJ"]: processedItem[3],
          ["Nome fantasia"]: processedItem[7],
          ["Razão Social"]: processedItem[4],
          ["Inscrição estadual"]: processedItem[5],
          ["Ramo de atividade"]: processedItem[6],
          ["Telefone"]: processedItem[8],
          ["E-mail comercial:"]: processedItem[9],
          ["E-mail financeiro:"]: processedItem[10],
        });
      case "Atualizado Localização":
        return JSON.stringify({
          ["CEP"]: processedItem[2],
          ["Cidade"]: `${processedItem[3]} - ${processedItem[4]}`,
          ["Bairro"]: processedItem[5],
          ["Endereço"]: processedItem[7],
          ["Número"]: processedItem[6],
          ["Complemento"]: processedItem[8],
        });
      case "Cadastrado Representante":
      case "Atualizado Representante":
      case "Excluído Representante":
        return JSON.stringify({
          ["Nome"]: processedItem[2],
          ["CPF"]: cpfMask(processedItem[3]),
          ["Cargo"]: processedItem[7],
          ["Contato comercial?"]: processedItem[4] === true ? "Sim" : "Não",
          ["Representante?"]: processedItem[5] === true ? "Sim" : "Não",
          ["E-mail"]: processedItem[6],
          ["Telefone"]: telefoneMask(processedItem[7]),
        });
      case "Cadastrado Condição Comercial":
      case "Atualizado Condição Comercial":
      case "Excluído Condição Comercial":
        return JSON.stringify({
          ["Produto"]: processedItem[3],
          ["Tipo pagamento"]: processedItem[4],
          ["Faturamento"]: processedItem[5],
          ["Tipo rede"]: processedItem[6],
          ["Saque incluso?"]: processedItem[7] === true ? "Sim" : "Não",
          ["Saque"]: parseToReal(processedItem[8]),
          ["Apuração"]: `${processedItem[9]} dias`,
          ["Pagamento"]: `${processedItem[10]} dias`,
          ["Taxa"]: parseToPercentual(processedItem[11]),
          ["Limite"]: parseToReal(processedItem[12]),
          ["Adesão"]: parseToReal(processedItem[13]),
          ["Emissão"]: parseToReal(processedItem[14]),
          ["Segunda via"]: parseToReal(processedItem[15]),
        });
      case "Cadastrado Filial": {
        const [matriz] = String(processedItem).split(",");
        return `Vinculado filial com a matriz: ${cnpjMask(matriz)}.`;
      }
      case "Excluído Filial":
        return `Desvínculo de filial com matriz: ${cnpjMask(
          String(processedItem)
        )}.`;
      case "Excluído Justificativa":
      case "Cadastrado Observação":
      case "Atualizado Observação":
      case "Excluído Observação":
        return item;
      default:
        return "";
    }
  };

  const formattedMessageStatus = (titulo: string, justificativa?: string) => {
    switch (titulo) {
      case "Aguardando aprovação":
        return "Credenciamento encaminhado para aprovação.";
      case "Aprovado":
        return "Aprovado credenciamento.";
      case "Desenvolvimento":
        return "Cancelado envio de credenciamento para aprovação.";
      case "Excluído":
        return "Aprovada exclusão de credenciamento.";
      case "Em exclusão":
      case "Reprovado":
      case "Retornado":
      case "Exclusão reprovada":
        return justificativa ? justificativa : "";
      default:
        return "";
    }
  };

  const handleClose = () => {
    setModal("");
    setType("");
  };

  return (
    <ModalStructure modalVariant="FullArea">
      <header>
        <Text fontText="Histórico credenciamento" icon={faClock} variant="h1" />
        <div className="modal-historic__content__icon">
          <Icon
            icon={faXmark}
            color="red"
            variant="button"
            onClick={handleClose}
          />
        </div>
      </header>
      <div className="modal-historic__content">
        <Text
          fontText={`${cnpjMask(cliente.cnpj)} - ${cliente.razaoSocial}`}
          variant="h2"
        />
        <div className="modal-historic__content__list">
          {registros.map((registro, index) => {
            return (
              <div key={index} className="modal-historic__content__grid">
                <span className="modal-historic__content__grid--sm">
                  <p className="modal-historic__content__text modal-historic__content__text--bolder">
                    {registro.usuario}
                  </p>
                </span>
                <span className="modal-historic__content__grid--lg">
                  <p className="modal-historic__content__text">
                    {registro.item}
                  </p>
                </span>
                <span className="modal-historic__content__grid--sm">
                  <p className="modal-historic__content__text modal-historic__content__text--bolder">
                    {registro.titulo}
                  </p>
                  <p className="modal-historic__content__text">
                    {registro.data}
                  </p>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </ModalStructure>
  );
};

export default HistoricoCredenciamento;
