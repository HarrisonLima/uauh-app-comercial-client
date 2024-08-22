import { useParams } from "react-router-dom";
import { useModalContext } from "../../../hooks/context/useModalContext";
import { useEffect, useState } from "react";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import useCredenciamentoCliente from "../../../hooks/operators/useCliente";
import ModalStructure from "../../../components/Modals/Structure";
import Text from "../../../components/Text";
import getData from "../../../api/Restfull/get";
import Button from "../../../components/Button";
import Dropdown from "../../../components/Dropdown";
import DropdownData from "../../DropdownData";
import useMask from "../../../hooks/useMask";

interface ICredenciador {
  credenciador: string;
}

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

interface IStatus {
  aprovador: string;
  credenciador: string;
  dataAprovacao: string;
  dataCriacao: string;
  status: string;
}

interface IUsuario {
  id: number;
  Nome: string;
  "Perfil Acesso": string;
  Situação: string;
  Usuário: string;
}

const TransferCredenciamento = () => {
  const params = useParams();
  const paramsCnpj = params.cnpj!;
  const { setModal, setType } = useModalContext();
  const { TRANSFER_Cliente } = useCredenciamentoCliente();
  const [loading, setLoading] = useState(true);
  const { cnpjMask } = useMask();

  const initialObject: ICredenciador = {
    credenciador: "",
  };

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

  const initialStatus: IStatus = {
    aprovador: "",
    credenciador: "",
    dataAprovacao: "",
    dataCriacao: "",
    status: "",
  };

  const [object, setObject] = useState(initialObject);
  const [cliente, setCliente] = useState<ICliente>(initialCliente);
  const [status, setStatus] = useState<IStatus>(initialStatus);
  const [credenciadores, setCredenciadores] = useState<IUsuario[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const cliente = await getData(
          "credenciamentos/clientes/identificacoes",
          paramsCnpj
        );

        const status = await getData(
          "credenciamentos/clientes/status",
          paramsCnpj
        );

        const usuarios = await getData("usuarios");

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

        if (status.length > 0) {
          const updatedStatus = {
            aprovador: status[0]["Aprovador"],
            credenciador: status[0]["Credenciador"],
            dataAprovacao: status[0]["Data de aprovação"],
            dataCriacao: status[0]["Data de criação"],
            status: status[0]["Status"],
          };

          setStatus(updatedStatus);
        }

        if (usuarios.length > 0) {
          const newUsuarios = usuarios.filter(
            (user: {
              id: number;
              Usuário: string;
              Nome: string;
              Situação: string;
              "Perfil Acesso": string;
            }) => {
              return user["Usuário"] !== "asam.system";
            }
          );

          let listaUsuarios: IUsuario[] = [];

          newUsuarios.forEach((usuario: any) => {
            const updatedUsuario = {
              id: usuario["id"],
              Nome: `${usuario["Nome"]}(${usuario["Usuário"]})`,
              ["Perfil Acesso"]: usuario["Perfil Acesso"],
              Situação: usuario["Situação"],
              Usuário: usuario["Usuário"],
            };

            listaUsuarios.push(updatedUsuario);
          });

          setCredenciadores(listaUsuarios);
        }
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  const handleClickRemaneja = () => {
    const usuario = credenciadores.filter((credenciador: any) => {
      return credenciador.Nome === object.credenciador;
    });

    const data = {
      id: paramsCnpj,
      remanejado: usuario[0].id,
    };

    TRANSFER_Cliente(data);
  };

  const handleClickCancel = () => {
    setModal("");
    setType("");
  };

  return (
    <ModalStructure modalVariant="ComponentsArea">
      <Text
        fontText="Remanejar credenciamento"
        variant="h1"
        icon={faShare}
        theme="alert"
      />
      <div className="modal-interactive__content">
        <Text
          fontText={`${cnpjMask(cliente.cnpj)} - ${cliente.razaoSocial}`}
          variant="h3"
        />
        <div className="modal-interactive__content__info">
          <Text fontText="Responsável:" variant="h2" />
          <Text fontText={status.credenciador} variant="h3" />
        </div>
        {loading ? (
          <div>Carregando credenciadores...</div>
        ) : (
          <Dropdown
            fontText="Credenciador"
            options={DropdownData(true, credenciadores, "Nome")}
            size="xl"
            onChange={(option: any) => {
              setObject((prevState) => ({
                ...prevState,
                credenciador: option.text,
              }));
            }}
            value={object.credenciador}
          />
        )}
        <div className="modal-interactive__content__button">
          <Button fontText="Cancelar" onClick={() => handleClickCancel()} />
          <Button
            fontText="Remanejar"
            icon={faShare}
            variant="alert"
            onClick={handleClickRemaneja}
          />
        </div>
      </div>
    </ModalStructure>
  );
};

export default TransferCredenciamento;
