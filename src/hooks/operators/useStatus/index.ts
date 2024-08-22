import { useStatusContext } from "../../context/useStatusContext";
import postData from "../../../api/Restfull/post";
import { useModalContext } from "../../context/useModalContext";
import updateData from "../../../api/Restfull/update";

const useStatus = () => {
  const { data, setStatus } = useStatusContext();
  const { setModal, setType } = useModalContext();

  const ADD_Status = () => {
    setType("Message");

    data.status != ""
      ? postData("status", data)
          .then(() => {
            setStatus("");
            setModal("SucessoCadastrar");
          })
          .catch(() => {
            setModal("FalhaCadastrar");
          })
      : setModal("PreencherTodosCampos");
  };

  const UPDATE_Status = (data: any) => {
    setType("Message");

    data.id != 0 && data.status != "" && data.situacao != ""
      ? updateData("status", data.id, data)
          .then(() => {
            setModal("SucessoAtualizarCadastro");
          })
          .catch(() => {
            setModal("FaildUpdate");
          })
      : setModal("PreencherTodosCampos");
  };
  return {
    ADD_Status,
    UPDATE_Status,
  };
};

export default useStatus;
