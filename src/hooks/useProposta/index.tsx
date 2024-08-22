import { useParams } from "react-router-dom";
import useMask from "../useMask";
import useFormatter from "../useFormatter";
import * as XLSX from "xlsx";

interface IStatus {
  aprovador: string;
  credenciador: string;
  dataAprovacao: string;
  dataCriacao: string;
  status: string;
}

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

const useProposta = () => {
  const params = useParams();
  const paramsCnpj = params.cnpj!;
  const { cnpjMask, cepMask } = useMask();
  const { parseToPercentual, parseToReal } = useFormatter();

  const propostaCliente = (
    status: IStatus,
    identificacao: IIdentificacao,
    localizacao: ILocalizacao,
    representantes: IRepresentante[],
    condicoesComerciais: ICondicao[]
  ) => {
    const data = [
      {
        Credenciador: status.credenciador,
        Aprovador: status.aprovador,
        CNPJ: cnpjMask(paramsCnpj),
        "Razão social": identificacao.razaoSocial,
        "Nome fantasia": identificacao.nomeFantasia,
        "Ramo de atividade": identificacao.ramoAtividade,
        "Inscrição estadual": identificacao.inscricaoEstadual,
        "Órgão público": identificacao.orgaoPublico === true ? "Sim" : "Não",
        "Optante nacional":
          identificacao.simplesNacional === true ? "Sim" : "Não",
        Telefone: identificacao.telefone,
        "E-mail comercial": identificacao.email,
        "E-mail financeiro":
          identificacao.emailFinanceiro === ""
            ? "N/A"
            : identificacao.emailFinanceiro,
        CEP: cepMask(localizacao.cep),
        Cidade: `${localizacao.cidade} - ${localizacao.uf}`,
        Endereço: `${localizacao.endereco}, ${localizacao.bairro}, nº ${localizacao.numero}`,
        Complemento:
          localizacao.complemento === "" ? "N/A" : localizacao.complemento,

        Representante1: representantes[0].nome,
        CPF1: representantes[0].cpf,
        Cargo1: representantes[0].cargo,
        "Contato comercial1": representantes[0].contatoComercial
          ? "Sim"
          : "Não",
        Testemunha1: representantes[0].testemunha ? "Sim" : "Não",
        "Telefone representante1": representantes[0].telefone,
        "E-mail representante1": representantes[0].email,

        Representante2:
          representantes[1] === undefined ? "" : representantes[1].nome,
        CPF2: representantes[1] === undefined ? "" : representantes[1].cpf,
        Cargo2: representantes[1] === undefined ? "" : representantes[1].cargo,
        "Contato comercial2":
          representantes[1] === undefined
            ? ""
            : representantes[1].contatoComercial
            ? "Sim"
            : "Não",
        Testemunha2:
          representantes[1] === undefined
            ? ""
            : representantes[1].testemunha
            ? "Sim"
            : "Não",
        "Telefone representante2":
          representantes[1] === undefined ? "" : representantes[1].telefone,
        "E-mail representante2":
          representantes[1] === undefined ? "" : representantes[1].email,

        Representante3:
          representantes[2] === undefined ? "" : representantes[2].nome,
        CPF3: representantes[2] === undefined ? "" : representantes[2].cpf,
        Cargo3: representantes[2] === undefined ? "" : representantes[2].cargo,
        "Contato comercial3":
          representantes[2] === undefined
            ? ""
            : representantes[2].contatoComercial
            ? "Sim"
            : "Não",
        Testemunha3:
          representantes[2] === undefined
            ? ""
            : representantes[2].testemunha
            ? "Sim"
            : "Não",
        "Telefone representante3":
          representantes[2] === undefined ? "" : representantes[2].telefone,
        "E-mail representante3":
          representantes[2] === undefined ? "" : representantes[2].email,

        Produto1: condicoesComerciais[0].produto,
        Taxa1: parseToPercentual(condicoesComerciais[0].taxa),
        Rede1: condicoesComerciais[0].rede,
        Faturamento1: condicoesComerciais[0].faturamento,
        "Forma pag1": condicoesComerciais[0].tipoPagamento,
        Saque1: condicoesComerciais[0].saqueIncluso === true ? "Sim" : "Não",
        Apuração1: `${condicoesComerciais[0].apuracao} dias`,
        Pagamento1: `${condicoesComerciais[0].pagamento} dias`,
        Adesão1: parseToReal(condicoesComerciais[0].adesao),
        Limite1: parseToReal(condicoesComerciais[0].limite),
        Emissão1: parseToReal(condicoesComerciais[0].emissao),
        "Segunda via1": parseToReal(condicoesComerciais[0].segundaVia),

        Produto2:
          condicoesComerciais[1] === undefined
            ? ""
            : condicoesComerciais[1].produto,
        Taxa2:
          condicoesComerciais[1] === undefined
            ? ""
            : parseToPercentual(condicoesComerciais[1].taxa),
        Rede2:
          condicoesComerciais[1] === undefined
            ? ""
            : condicoesComerciais[1].rede,
        Faturamento2:
          condicoesComerciais[1] === undefined
            ? ""
            : condicoesComerciais[1].faturamento,
        "Forma pag2":
          condicoesComerciais[1] === undefined
            ? ""
            : condicoesComerciais[1].tipoPagamento,
        Saque2:
          condicoesComerciais[1] === undefined
            ? ""
            : condicoesComerciais[1].saqueIncluso === true
            ? "Sim"
            : "Não",
        Apuração2:
          condicoesComerciais[1] === undefined
            ? ""
            : `${condicoesComerciais[1].apuracao} dias`,
        Pagamento2:
          condicoesComerciais[1] === undefined
            ? ""
            : `${condicoesComerciais[1].pagamento} dias`,
        Adesão2:
          condicoesComerciais[1] === undefined
            ? ""
            : parseToReal(condicoesComerciais[1].adesao),
        Limite2:
          condicoesComerciais[1] === undefined
            ? ""
            : parseToReal(condicoesComerciais[1].limite),
        Emissão2:
          condicoesComerciais[1] === undefined
            ? ""
            : parseToReal(condicoesComerciais[1].emissao),
        "Segunda via2":
          condicoesComerciais[1] === undefined
            ? ""
            : parseToReal(condicoesComerciais[1].segundaVia),

        Produto3:
          condicoesComerciais[2] === undefined
            ? ""
            : condicoesComerciais[2].produto,
        Taxa3:
          condicoesComerciais[2] === undefined
            ? ""
            : parseToPercentual(condicoesComerciais[2].taxa),
        Rede3:
          condicoesComerciais[2] === undefined
            ? ""
            : condicoesComerciais[2].rede,
        Faturamento3:
          condicoesComerciais[2] === undefined
            ? ""
            : condicoesComerciais[2].faturamento,
        "Forma pag3":
          condicoesComerciais[2] === undefined
            ? ""
            : condicoesComerciais[2].tipoPagamento,
        Saque3:
          condicoesComerciais[2] === undefined
            ? ""
            : condicoesComerciais[2].saqueIncluso === true
            ? "Sim"
            : "Não",
        Apuração3:
          condicoesComerciais[2] === undefined
            ? ""
            : `${condicoesComerciais[2].apuracao} dias`,
        Pagamento3:
          condicoesComerciais[2] === undefined
            ? ""
            : `${condicoesComerciais[2].pagamento} dias`,
        Adesão3:
          condicoesComerciais[2] === undefined
            ? ""
            : parseToReal(condicoesComerciais[2].adesao),
        Limite3:
          condicoesComerciais[2] === undefined
            ? ""
            : parseToReal(condicoesComerciais[2].limite),
        Emissão3:
          condicoesComerciais[2] === undefined
            ? ""
            : parseToReal(condicoesComerciais[2].emissao),
        "Segunda via3":
          condicoesComerciais[2] === undefined
            ? ""
            : parseToReal(condicoesComerciais[2].segundaVia),

        Produto4:
          condicoesComerciais[3] === undefined
            ? ""
            : condicoesComerciais[3].produto,
        Taxa4:
          condicoesComerciais[3] === undefined
            ? ""
            : parseToPercentual(condicoesComerciais[3].taxa),
        Rede4:
          condicoesComerciais[3] === undefined
            ? ""
            : condicoesComerciais[3].rede,
        Faturamento4:
          condicoesComerciais[3] === undefined
            ? ""
            : condicoesComerciais[3].faturamento,
        "Forma pag4":
          condicoesComerciais[3] === undefined
            ? ""
            : condicoesComerciais[3].tipoPagamento,
        Saque4:
          condicoesComerciais[3] === undefined
            ? ""
            : condicoesComerciais[3].saqueIncluso === true
            ? "Sim"
            : "Não",
        Apuração4:
          condicoesComerciais[3] === undefined
            ? ""
            : `${condicoesComerciais[3].apuracao} dias`,
        Pagamento4:
          condicoesComerciais[3] === undefined
            ? ""
            : `${condicoesComerciais[3].pagamento} dias`,
        Adesão4:
          condicoesComerciais[3] === undefined
            ? ""
            : parseToReal(condicoesComerciais[3].adesao),
        Limite4:
          condicoesComerciais[3] === undefined
            ? ""
            : parseToReal(condicoesComerciais[3].limite),
        Emissão4:
          condicoesComerciais[3] === undefined
            ? ""
            : parseToReal(condicoesComerciais[3].emissao),
        "Segunda via4":
          condicoesComerciais[3] === undefined
            ? ""
            : parseToReal(condicoesComerciais[3].segundaVia),

        Produto5:
          condicoesComerciais[4] === undefined
            ? ""
            : condicoesComerciais[4].produto,
        Taxa5:
          condicoesComerciais[4] === undefined
            ? ""
            : parseToPercentual(condicoesComerciais[4].taxa),
        Rede5:
          condicoesComerciais[4] === undefined
            ? ""
            : condicoesComerciais[4].rede,
        Faturamento5:
          condicoesComerciais[4] === undefined
            ? ""
            : condicoesComerciais[4].faturamento,
        "Forma pag5":
          condicoesComerciais[4] === undefined
            ? ""
            : condicoesComerciais[4].tipoPagamento,
        Saque5:
          condicoesComerciais[4] === undefined
            ? ""
            : condicoesComerciais[4].saqueIncluso === true
            ? "Sim"
            : "Não",
        Apuração5:
          condicoesComerciais[4] === undefined
            ? ""
            : `${condicoesComerciais[4].apuracao} dias`,
        Pagamento5:
          condicoesComerciais[4] === undefined
            ? ""
            : `${condicoesComerciais[4].pagamento} dias`,
        Adesão5:
          condicoesComerciais[4] === undefined
            ? ""
            : parseToReal(condicoesComerciais[4].adesao),
        Limite5:
          condicoesComerciais[4] === undefined
            ? ""
            : parseToReal(condicoesComerciais[4].limite),
        Emissão5:
          condicoesComerciais[4] === undefined
            ? ""
            : parseToReal(condicoesComerciais[4].emissao),
        "Segunda via5":
          condicoesComerciais[4] === undefined
            ? ""
            : parseToReal(condicoesComerciais[4].segundaVia),
      },
    ];

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Proposta");

    XLSX.writeFile(
      wb,
      `Cliente ${paramsCnpj} - ${identificacao.razaoSocial}.xlsx`
    );

    return data;
  };

  return { propostaCliente };
};

export default useProposta;
