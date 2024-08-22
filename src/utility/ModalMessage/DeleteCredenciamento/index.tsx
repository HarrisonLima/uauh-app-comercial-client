import { useParams } from "react-router-dom";
import { useModalContext } from "../../../hooks/context/useModalContext";
import { useEffect, useState } from "react";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useCredenciamentoCliente from "../../../hooks/operators/useCliente";

import ModalStructure from "../../../components/Modals/Structure";
import Text from "../../../components/Text";
import getData from "../../../api/Restfull/get";
import useCookies from "../../../storage/Cookies";
import Button from "../../../components/Button";
import TextBox from "../../../components/TextBox";
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

const DeleteCredenciamentoCliente = () => {
  const params = useParams();
    const paramsCnpj = params.cnpj ? params.cnpj : "";
  const { GET_Profile } = useCookies();
  const [message, setMessage] = useState();
  const profile = GET_Profile();
  const { setModal, setType } = useModalContext();
  const { DELETE_Cliente } = useCredenciamentoCliente();
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

  const [object, setObject] = useState<ICliente>(initialCliente);

  useEffect(() => {
    const fetch = async () => {
      const cliente = await getData(
        "credenciamentos/clientes/identificacoes",
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

        setObject(updatedCliente);
      }
    };
    fetch();
  }, []);

  const handleClickDelete = () => {
    const data = {
      cliente: paramsCnpj,
      status: "Em exclusão",
      justificativa: message,
    };
    DELETE_Cliente(data);
  };

  const handleClickCancel = () => {
    setModal("");
    setType("");
  };

  return (
    <ModalStructure modalVariant="ComponentsArea">
      <Text
        fontText="Excluir credenciamento cliente"
        variant="h1"
        icon={faCircleXmark}
        theme="danger"
      />
      <div className="modal-interactive__content">
        <Text fontText={`${cnpjMask(object.cnpj)} - ${object.razaoSocial}`} variant="h2"/>
        <TextBox
          header={[{ "Credenciador:": `${profile.nome} (${profile.usuario})` }]}
          theme="danger"
          onChange={setMessage}
        />
        <div className="modal-interactive__content__button">
          <Button fontText="Cancelar" onClick={() => handleClickCancel()} />
          <Button
            fontText="Excluir"
            variant="danger"
            icon={faCircleXmark}
            onClick={handleClickDelete}
          />
        </div>
      </div>
    </ModalStructure>
  );
};

export default DeleteCredenciamentoCliente;
