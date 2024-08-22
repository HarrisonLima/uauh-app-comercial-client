import { useUsuarioContext } from "../../context/useUsuarioContext";
import postData from "../../../api/Restfull/post";
import { useModalContext } from "../../context/useModalContext";
import updateData from "../../../api/Restfull/update";

const useUsuario = () => {
  const { data, setPerfilAcesso, setUsuario, setSenha, setNome } =
    useUsuarioContext();
  const { setModal, setType } = useModalContext();

  const ADD_Usuario = () => {
    setType("Message");

    typeof data.perfilAcesso != undefined &&
    data.perfilAcesso != "" &&
    data.usuario != "" &&
    data.senha != "" &&
    data.nome != ""
      ? postData("usuarios", data)
          .then(() => {
            setPerfilAcesso("");
            setUsuario("");
            setSenha("");
            setNome("");
            setModal("SucessoCadastrar");
          })
          .catch((error) => {
            console.log(`Erro na requisição: ${error}`);
            setModal("FalhaCadastrar");
          })
      : setModal("PreencherTodosCampos");
  };

  const UPDATE_Usuario = (data: any) => {
    setType("Message");

    data.id != 0 &&
    data.perfilAcesso != "" &&
    data.usuario != "" &&
    data.nome != "" &&
    data.situacao != ""
      ? updateData("usuarios", data.id, data)
          .then(() => {
            setModal("SucessoAtualizarCadastro");
          })
          .catch((error) => {
            console.log(`Erro na requisição: ${error}`);
            setModal("FaildUpdate");
          })
      : setModal("PreencherTodosCampos");
  };

  const RESET_PASSWORD_Usuario = (data: any) => {
    setType("Message");

    updateData("usuarios/redefinir-senha", data.id, [])
      .then(() => {
        setModal("SucessoRedefinirSenha");
      })
      .catch((error) => {
        console.log(`Erro na requisição: ${error}`);
        setModal("FalhaRedefinirSenha");
      });
  };

  return {
    ADD_Usuario,
    UPDATE_Usuario,
    RESET_PASSWORD_Usuario,
  };
};

export default useUsuario;
