import {
  faAnglesRight,
  faCheck,
  faHand,
  faInfo,
  faKey,
  faRotateBack,
  faRotateLeft,
  faTrash,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import ModalInfo from "./ModalInfo";
import { useModalContext } from "../../hooks/context/useModalContext";
import ConfirmResetPassword from "./ConfirmResetPassword";
import ReproveCredenciamentoCliente from "./ReproveCredenciamento";

const ModalMessage = () => {
  const { modal } = useModalContext();

  switch (modal.modal) {
    case "SucessoRemanejarCliente":
      return (
        <ModalInfo
          variant="sucess"
          icon={faCheck}
          title="Situação de credenciamento"
          fontText="Credenciamento de cliente remanejado"
        />
      );
    case "SucessoAtualizarCriterio":
      return (
        <ModalInfo
          variant="sucess"
          icon={faCheck}
          title="Situação de parâmetro"
          fontText="Parâmetro atualizado com sucesso!"
        />
      );
    case "SucessoAtualizarCliente":
      return (
        <ModalInfo
          variant="sucess"
          icon={faCheck}
          title="Situação de credenciamento"
          fontText="Cliente atualizado com sucesso!"
        />
      );
    case "SucessoAtualizarCredencial":
      return (
        <ModalInfo
          variant="sucess"
          icon={faCheck}
          title="Situação de credenciamento"
          fontText="Credencial atualizado com sucesso!"
        />
      );
    case "SucessoCadastrar":
      return (
        <ModalInfo
          variant="sucess"
          icon={faCheck}
          title="Situação do cadastro"
          fontText="Cadastro realizado com sucesso!"
        />
      );
    case "SucessoCredenciarCliente":
      return (
        <ModalInfo
          variant="sucess"
          icon={faCheck}
          title="Situação de credenciamento"
          fontText="Cliente cadastrado!"
        />
      );
    case "SucessoVincularFilial":
      return (
        <ModalInfo
          variant="sucess"
          icon={faCheck}
          title="Situação de credenciamento"
          fontText="Filial vinculada!"
        />
      );
    case "SucessoDesvincularFilial":
      return (
        <ModalInfo
          variant="sucess"
          icon={faCheck}
          title="Situação de credenciamento"
          fontText="Filial desvinculada!"
        />
      );
    case "SucessoReprovarCliente":
      return (
        <ModalInfo
          variant="sucess"
          icon={faCheck}
          title="Situação de credenciamento"
          fontText="Cliente reprovado!"
        />
      );
    case "SucessoRetornarCliente":
      return (
        <ModalInfo
          variant="alert"
          icon={faRotateBack}
          title="Situação de credenciamento"
          fontText="Cliente retornado!"
        />
      );
    case "SucessoReprovarExclusaoCliente":
      return (
        <ModalInfo
          variant="sucess"
          icon={faCheck}
          title="Situação de credenciamento"
          fontText="Reprovada solicitação de exclusão de cliente!"
        />
      );
    case "SucessoAtualizarCadastro":
      return (
        <ModalInfo
          variant="sucess"
          icon={faCheck}
          title="Situação do cadastro"
          fontText="Cadastro atualizado com sucesso!"
        />
      );
    case "SucessoRedefinirSenha":
      return (
        <ModalInfo
          variant="default"
          icon={faKey}
          title="Situação do cadastro"
          fontText="Senha redefinida!"
        />
      );
    case "SucessoObservacaoCliente":
      return (
        <ModalInfo
          variant="sucess"
          icon={faCheck}
          title="Situação do credenciamento"
          fontText="Observação registrada!"
        />
      );
    case "SucessoAtualizarObservacaoCliente":
      return (
        <ModalInfo
          variant="sucess"
          icon={faCheck}
          title="Situação do credenciamento"
          fontText="Observação atualizada!"
        />
      );
    case "FalhaObservarCliente":
      return (
        <ModalInfo
          variant="danger"
          icon={faXmark}
          title="Situação do credenciamento"
          fontText="Falha ao inserir observação!"
          reload={false}
        />
      );
    case "FalhaAtualizarObservarCliente":
      return (
        <ModalInfo
          variant="danger"
          icon={faXmark}
          title="Situação do credenciamento"
          fontText="Falha ao atualizar observação!"
          reload={false}
        />
      );
    case "FalhaCadastrar":
      return (
        <ModalInfo
          variant="danger"
          icon={faXmark}
          title="Situação do cadastro"
          fontText="Falha ao realizar cadastro!"
          reload={false}
        />
      );
    case "FalhaRemanejarCliente":
      return (
        <ModalInfo
          variant="danger"
          icon={faXmark}
          title="Situação do credenciamento"
          fontText="Falha ao remanejar credenciamento de cliente!"
          reload={false}
        />
      );
    case "FalhaVincularFilial":
      return (
        <ModalInfo
          variant="danger"
          icon={faXmark}
          title="Situação do credenciamento"
          fontText="Falha ao vincular filial."
          reload={false}
        />
      );
    case "FalhaDesvincularFilial":
      return (
        <ModalInfo
          variant="danger"
          icon={faXmark}
          title="Situação do credenciamento"
          fontText="Falha ao desvincular filial."
          reload={false}
        />
      );
    case "FalhaCredenciarCliente":
      return (
        <ModalInfo
          variant="danger"
          icon={faXmark}
          title="Situação do credenciamento"
          fontText="Falha ao cadastrar cliente!"
          reload={false}
        />
      );
    case "FalhaReprovarCliente":
      return (
        <ModalInfo
          variant="danger"
          icon={faXmark}
          title="Situação do credenciamento"
          fontText="Falha ao reprovar cliente!"
          reload={false}
        />
      );
    case "FalhaRetornarCliente":
      return (
        <ModalInfo
          variant="danger"
          icon={faXmark}
          title="Situação do credenciamento"
          fontText="Falha ao retornar cliente!"
          reload={false}
        />
      );
    case "FalhaReprovarExclusaoCliente":
      return (
        <ModalInfo
          variant="danger"
          icon={faXmark}
          title="Situação do credenciamento"
          fontText="Falha ao reprovar exclusão de cliente!"
          reload={false}
        />
      );
    case "FalhaAtualizarCadastro":
      return (
        <ModalInfo
          variant="danger"
          icon={faXmark}
          title="Situação do cadastro"
          fontText="Falha ao atualizar cadastro!"
          reload={false}
        />
      );
    case "FalhaAtualizarCliente":
      return (
        <ModalInfo
          variant="danger"
          icon={faXmark}
          title="Situação de credenciamento"
          fontText="Falha ao atualizar cliente!"
          reload={false}
        />
      );
    case "FalhaAtualizarCriterio":
      return (
        <ModalInfo
          variant="danger"
          icon={faCheck}
          title="Situação de parâmetro"
          fontText="Falha ao atualizar o parâmetro!"
          reload={false}
        />
      );
    case "FalhaRequisição":
      return (
        <ModalInfo
          variant="danger"
          icon={faXmark}
          title="Situação do cadastro"
          fontText="Falha na requisição!"
          reload={false}
        />
      );
    case "FalhaRedefinirSenha":
      return (
        <ModalInfo
          variant="danger"
          icon={faKey}
          title="Situação do cadastro"
          fontText="Falha ao redefinir senha!"
          reload={false}
        />
      );
    case "FalhaExcluirObservacaoCliente":
      return (
        <ModalInfo
          variant="danger"
          icon={faXmark}
          title="Situação do credenciamento"
          fontText="Falha ao excluir observação!"
          reload={false}
        />
      );
    case "ExcluirObservacaoCliente":
      return (
        <ModalInfo
          variant="danger"
          icon={faTrash}
          title="Situação do credenciamento"
          fontText="Observação excluída!"
        />
      );
    case "EnviarCredenciamentoAprovacao":
      return (
        <ModalInfo
          variant="alert"
          icon={faAnglesRight}
          title="Situação do credebnciamento"
          fontText="Credenciamento enviado para aprovação!"
        />
      );
    case "EnviarCredenciamentoExclusao":
      return (
        <ModalInfo
          variant="alert"
          icon={faAnglesRight}
          title="Situação do credenciamento"
          fontText="Credenciamento enviado para exclusão!"
        />
      );
    case "CanceladoEnvioCredenciamentoAprovacao":
      return (
        <ModalInfo
          variant="alert"
          title="Situação do credenciamento"
          icon={faRotateLeft}
          fontText="Cancelado envio de credenciamento para aprovação!"
        />
      );
    case "RetornadoCredenciamento":
      return (
        <ModalInfo
          variant="alert"
          icon={faRotateLeft}
          title="Situação do credenciamento"
          fontText="Retornado credenciamento para desenvolvimento!"
        />
      );
    case "PreencherTodosCampos":
      return (
        <ModalInfo
          variant="default"
          icon={faInfo}
          title="Situação do cadastro"
          fontText="Certifique-se que os campos estão preenchidos!"
          reload={false}
        />
      );
    case "SenhasNaoCorrespondentes":
      return (
        <ModalInfo
          variant="danger"
          icon={faXmark}
          title="Situação do cadastro"
          fontText="As senhas não são correspondentes!"
          reload={false}
        />
      );
    case "InformacoesInvalidas":
      return (
        <ModalInfo
          variant="danger"
          icon={faHand}
          title="Situação do cadastro"
          fontText="As informações não correspondem ao exigido!"
          reload={false}
        />
      );
    case "NaoAutorizado":
      return (
        <ModalInfo
          variant="danger"
          icon={faUser}
          title="Solicitação de autenticação"
          fontText="Usuário ou senha incorretos!"
          reload={false}
        />
      );
    case "FalhaRequisicao":
      return (
        <ModalInfo
          variant="danger"
          icon={faUser}
          title="Solicitação de requisição"
          fontText="Infelizmente houve uma falha na solicitação da requisição. Tente novamente mais tarde!"
          reload={false}
        />
      );
    case "ConfirmarRedefinicaoSenha":
      return <ConfirmResetPassword />;
    case "ReprovarCredenciamentoCliente":
      return <ReproveCredenciamentoCliente />;
    default:
      return null;
  }
};

export default ModalMessage;
