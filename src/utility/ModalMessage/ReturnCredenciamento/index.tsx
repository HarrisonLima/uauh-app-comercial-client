import { useParams } from "react-router-dom";
import { useModalContext } from "../../../hooks/context/useModalContext";
import { useEffect, useState } from "react";
import { faCircleXmark, faRotateBack } from "@fortawesome/free-solid-svg-icons";
import useCookies from "../../../storage/Cookies";
import useCredenciamentoCliente from "../../../hooks/operators/useCliente";
import ModalStructure from "../../../components/Modals/Structure";
import Text from "../../../components/Text";
import getData from "../../../api/Restfull/get";
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

const ReturnCredenciamentoCliente = () => {
  const params = useParams();
    const paramsCnpj = params.cnpj ? params.cnpj : "";
  const { GET_Profile } = useCookies();
  const [message, setMessage] = useState();
  const profile = GET_Profile();
  const { setModal, setType } = useModalContext();
  const { RETURN_Cliente } = useCredenciamentoCliente();
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

  const handleClickReturn = () => {
    const data = {
      cliente: paramsCnpj,
      status: "Retornado",
      justificativa: message,
    };
    RETURN_Cliente(data);
  };

  const handleClickCancel = () => {
    setModal("");
    setType("");
  };

  return (
    <ModalStructure modalVariant="ComponentsArea">
      <Text
        fontText="Retornar credenciamento cliente"
        variant="h1"
        theme="alert"
        icon={faCircleXmark}
      />
      <div className="modal-interactive__content">
        <Text
          fontText={`${cnpjMask(object.cnpj)} - ${object.razaoSocial}`} variant="h3"
        />
        <TextBox
          header={[
            {
              [`${
                profile.perfil === "Aprovador" ? "Aprovador:" : "Credenciador:"
              }`]: `${profile.nome} (${profile.usuario})`,
            },
          ]}
          theme="alert"
          onChange={setMessage}
        />
        <div className="modal-interactive__content__button">
          <Button fontText="Cancelar" onClick={() => handleClickCancel()} />
          <Button
            fontText="Retornar"
            variant="alert"
            icon={faRotateBack}
            onClick={handleClickReturn}
          />
        </div>
      </div>
    </ModalStructure>
  );
};

export default ReturnCredenciamentoCliente;
