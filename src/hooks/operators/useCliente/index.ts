import { useModalContext } from "../../context/useModalContext";
import postData from "../../../api/Restfull/post";
import updateData from "../../../api/Restfull/update";
import deleteData from "../../../api/Restfull/delete";

const useCliente = () => {
  const { setModal, setType } = useModalContext();

  const ADD_Identificacao = (data: any) => {
    setType("Message");

    postData("credenciamentos/clientes/identificacoes", data)
      .then(() => {
        setModal("SucessoCredenciarCliente");
      })
      .catch(() => {
        setModal("FalhaCredenciarCliente");
      });
  };

  const UPDATE_Identificacao = (data: any) => {
    setType("Message");

    updateData("credenciamentos/clientes/identificacoes", data.id, data)
      .then(() => {
        setModal("SucessoAtualizarCliente");
      })
      .catch(() => {
        setModal("FalhaAtualizarCliente");
      });
  };

  const UPDATE_Localizacao = (data: any) => {
    setType("Message");

    updateData("credenciamentos/clientes/localizacoes", data.id, data)
      .then(() => {
        setModal("SucessoAtualizarCliente");
      })
      .catch(() => {
        setModal("FalhaAtualizarCliente");
      });
  };

  const ADD_Representante = (data: any) => {
    setType("Message");

    postData("credenciamentos/clientes/representantes", data)
      .then(() => {
        setModal("SucessoAtualizarCliente");
      })
      .catch(() => {
        setModal("FalhaAtualizarCliente");
      });
  };

  const UPDATE_Representante = (data: any) => {
    setType("Message");

    updateData("credenciamentos/clientes/representantes", data.id, data)
      .then(() => {
        setModal("SucessoAtualizarCliente");
      })
      .catch(() => {
        setModal("FalhaAtualizarCliente");
      });
  };

  const ADD_CondicaoComercial = (data: any) => {
    setType("Message");

    postData("credenciamentos/clientes/condicoes-comerciais", data)
      .then(() => {
        setModal("SucessoAtualizarCliente");
      })
      .catch(() => {
        setModal("FalhaAtualizarCliente");
      });
  };

  const UPDATE_CondicaoComercial = (data: any) => {
    setType("Message");

    updateData("credenciamentos/clientes/condicoes-comerciais", data.id, data)
      .then(() => {
        setModal("SucessoAtualizarCliente");
      })
      .catch(() => {
        setModal("FalhaAtualizarCliente");
      });
  };

  const REPROVE_Cliente = (data: any) => {
    postData("credenciamentos/clientes/justificativas", data)
      .then(() => {
        setModal("SucessoReprovarCliente");
      })
      .catch(() => {
        setModal("FalhaReprovarCliente");
      });
  };

  const RETURN_Cliente = (data: any) => {
    setType("Message");

    postData("credenciamentos/clientes/justificativas", data)
      .then(() => {
        setModal("SucessoRetornarCliente");
      })
      .catch(() => {
        setModal("FalhaRetornarCliente");
      });
  };

  const REPROVE_DELETE_Cliente = (data: any) => {
    setType("Message");

    postData("credenciamentos/clientes/justificativas", data)
      .then(() => {
        setModal("SucessoReprovarExclusaoCliente");
      })
      .catch(() => {
        setModal("FalhaReprovarExclusaoCliente");
      });
  };

  const DELETE_Cliente = (data: any) => {
    setType("Message");

    postData("credenciamentos/clientes/justificativas", data)
      .then(() => {
        setModal("EnviarCredenciamentoExclusao");
      })
      .catch(() => {
        setModal("FalhaRequisição");
      });
  };

  const TRANSFER_Cliente = (data: any) => {
    setType("Message");

    updateData("credenciamentos/clientes/remanejacoes", data.id, data)
      .then(() => {
        setModal("SucessoRemanejarCliente");
      })
      .catch(() => {
        setModal("FalhaRemanejarCliente");
      });
  };

  const ADD_OBSERVACAO_Cliente = (data: any) => {
    setType("Message");

    postData("credenciamentos/clientes/observacoes", data)
      .then(() => {
        setModal("SucessoObservacaoCliente");
      })
      .catch(() => {
        setModal("FalhaObservarCliente");
      });
  };

  const UPDATE_OBSERVACAO_Cliente = (data: any) => {
    setType("Message");

    updateData("credenciamentos/clientes/observacoes", data.id, data)
      .then(() => {
        setModal("SucessoAtualizarObservacaoCliente");
      })
      .catch(() => {
        setModal("FalhaAtualizarObservarCliente");
      });
  };

  const DELETE_OBSERVACAO_Cliente = (data: any) => {
    setType("Message");

    deleteData("credenciamentos/clientes/observacoes", data.id)
      .then(() => {
        setModal("ExcluirObservacaoCliente");
      })
      .catch(() => {
        setModal("FalhaExcluirObservacaoCliente");
      });
  };

  const ADD_Filial = (data: any) => {
    setType("Message");

    postData("credenciamentos/clientes/identificacoes", data)
      .then(() => {
        setModal("SucessoCredenciarCliente");
      })
      .catch(() => {
        setModal("FalhaCredenciarCliente");
      });
  };

  const REMOVE_Filial = (data: any) => {
    setType("Message");

    deleteData("credenciamentos/clientes/filiais", data.id)
      .then(() => {
        setModal("SucessoDesvincularFilial");
      })
      .catch(() => {
        setModal("FalhaDesvincularFilial");
      });
  };

  const LINK_Filial = (data: any) => {
    setType("Message");

    postData("credenciamentos/clientes/filiais", data)
      .then(() => {
        setModal("SucessoVincularFilial");
      })
      .catch(() => {
        setModal("FalhaVincularFilial");
      });
  };

  return {
    ADD_Identificacao,
    UPDATE_Identificacao,
    UPDATE_Localizacao,
    ADD_Representante,
    UPDATE_Representante,
    ADD_CondicaoComercial,
    UPDATE_CondicaoComercial,
    REPROVE_Cliente,
    REPROVE_DELETE_Cliente,
    DELETE_Cliente,
    RETURN_Cliente,
    TRANSFER_Cliente,
    ADD_OBSERVACAO_Cliente,
    UPDATE_OBSERVACAO_Cliente,
    DELETE_OBSERVACAO_Cliente,
    ADD_Filial,
    REMOVE_Filial,
    LINK_Filial,
  };
};

export default useCliente;
