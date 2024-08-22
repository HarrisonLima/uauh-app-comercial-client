import { usePerfilAcessoContext } from "../../context/usePerfilAcessoContext";
import postData from "../../../api/Restfull/post";
import { useModalContext } from "../../context/useModalContext";
import updateData from "../../../api/Restfull/update";

const usePerfilAcesso = () => {
  const { data, setPerfilAcesso } = usePerfilAcessoContext();
  const { setModal, setType } = useModalContext();

  const ADD_PerfilAcesso = () => {
    setType("Message");

    data.perfilAcesso != ""
      ? postData("perfis", data)
          .then(() => {
            setPerfilAcesso("");
            setModal("SucessoCadastrar");
          })
          .catch(() => {
            setModal("FalhaCadastrar");
          })
      : setModal("PreencherTodosCampos");
  };

  const UPDATE_PerfilAcesso = (data: any) => {
    setType("Message");

    data.id != 0 && data.perfilAcesso != "" && data.situacao != ""
      ? updateData("perfis", data.id, data)
          .then(() => {
            setModal("SucessoAtualizarCadastro");
          })
          .catch(() => {
            setModal("FaildUpdate");
          })
      : setModal("PreencherTodosCampos");
  };

  return {
    ADD_PerfilAcesso,
    UPDATE_PerfilAcesso,
  };
};

export default usePerfilAcesso;
