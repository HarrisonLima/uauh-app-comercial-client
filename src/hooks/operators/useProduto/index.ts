import { useProdutoContext } from "../../context/useProdutoContext";
import postData from "../../../api/Restfull/post";
import { useModalContext } from "../../context/useModalContext";
import updateData from "../../../api/Restfull/update";

const useProduto = () => {
  const { data, setProduto } = useProdutoContext();
 const { setModal, setType } = useModalContext();

  const ADD_Produto = () => {
    setType("Message");

    data.produto != ""
      ? postData("produtos", data)
          .then(() => {
            setProduto("");
            setModal("SucessoCadastrar");
          })
          .catch((error) => {
            console.log(`Erro na requisição: ${error}`);
            setModal("FalhaCadastrar");
          })
      : setModal("PreencherTodosCampos");
  };

  const UPDATE_Produto = (data: any) => {
    setType("Message");

    data.id != 0 && data.produto != "" && data.situacao != ""
      ? updateData("produtos", data.id, data)
          .then(() => {
            setModal("SucessoAtualizarCadastro");
          })
          .catch((error) => {
            console.log(`Erro na requisição: ${error}`);
            setModal("FaildUpdate");
          })
      : setModal("PreencherTodosCampos");
  };
  return {
    ADD_Produto,
    UPDATE_Produto,
  };
};

export default useProduto;
