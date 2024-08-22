import { useParams } from "react-router-dom";
import { useModalContext } from "../../../hooks/context/useModalContext";
import { useEffect, useState } from "react";
import { faCheck, faComment, faTrash } from "@fortawesome/free-solid-svg-icons";
import useCredenciamentoCliente from "../../../hooks/operators/useCliente";
import ModalStructure from "../../../components/Modals/Structure";
import Text from "../../../components/Text";
import getData from "../../../api/Restfull/get";
import Button from "../../../components/Button";
import TextBox from "../../../components/TextBox";
import useCookies from "../../../storage/Cookies";
import Icon from "../../../components/Icon";
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

const IncluirObservacao = () => {
  const params = useParams();
    const paramsCnpj = params.cnpj ? params.cnpj : "";
  const { GET_Profile } = useCookies();
  const profile = GET_Profile();
  const { setModal, setType } = useModalContext();
  const {
    ADD_OBSERVACAO_Cliente,
    UPDATE_OBSERVACAO_Cliente,
    DELETE_OBSERVACAO_Cliente,
  } = useCredenciamentoCliente();
  const [message, setMessage] = useState();
  const [hasObservacao, setHasObservacao] = useState(false);
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
  };

  const [cliente, setCliente] = useState<ICliente>(initialCliente);

  useEffect(() => {
    const fetch = async () => {
      const cliente = await getData(
        "credenciamentos/clientes/identificacoes",
        paramsCnpj
      );

      const observacao = await getData(
        "credenciamentos/clientes/observacoes",
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

      if (observacao.length > 0) {
        setHasObservacao(true);
        setMessage(observacao[0]["Observação"]);
      }
    };

    fetch();
  }, []);

  const handleClickConcluir = () => {
    const data = {
      id: paramsCnpj,
      cliente: paramsCnpj,
      observacao: message,
    };

    hasObservacao
      ? UPDATE_OBSERVACAO_Cliente(data)
      : ADD_OBSERVACAO_Cliente(data);
  };

  const handleClickCancel = () => {
    setModal("");
    setType("");
  };

  const handleClickDelete = () => {
    const data = {
      id: paramsCnpj,
    };

    DELETE_OBSERVACAO_Cliente(data);
  };

  return (
    <ModalStructure modalVariant="ComponentsArea">
      <Text
        fontText="Inserir observação credenciamento"
        variant="h1"
        icon={faComment}
        theme="alert"
      />
      <div className="modal-interactive__content">
        <Text
          fontText={`${cnpjMask(cliente.cnpj)} - ${cliente.razaoSocial}`}
          variant="h3"
        />
        <TextBox
          header={[{ "Credenciador:": `${profile.nome} (${profile.usuario})` }]}
          theme="alert"
          onChange={setMessage}
          content={message}
        />
        {hasObservacao && (
          <span className="modal-interactive__content__icon">
            <Icon
              icon={faTrash}
              color="red"
              variant="button"
              onClick={() => handleClickDelete()}
            />
          </span>
        )}
        <div className="modal-interactive__content__button">
          <Button fontText="Cancelar" onClick={() => handleClickCancel()} />
          <Button
            fontText="Registrar"
            icon={faCheck}
            variant="alert"
            onClick={handleClickConcluir}
          />
        </div>
      </div>
    </ModalStructure>
  );
};

export default IncluirObservacao;
