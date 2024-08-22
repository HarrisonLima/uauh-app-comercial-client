
import { useParams } from "react-router-dom";
import { useModalContext } from "../../../hooks/context/useModalContext";
import { useEffect, useState } from "react";
import { faBuildingFlag } from "@fortawesome/free-solid-svg-icons";
import useCredenciamentoCliente from "../../../hooks/operators/useCliente";
import ModalStructure from "../../../components/Modals/Structure";
import Text from "../../../components/Text";
import getData from "../../../api/Restfull/get";
import Button from "../../../components/Button";
import useMask from "../../../hooks/useMask";

interface IEstab {
  cnpj: string;
  razaoSocial: string;
}

const DesvincularFilial = () => {
  const params = useParams();
    const paramsCnpj = params.cnpj ? params.cnpj : "";
  const { setModal, setType } = useModalContext();
  const { REMOVE_Filial } = useCredenciamentoCliente();
  const { cnpjMask } = useMask();

  const initialObject: IEstab = {
    cnpj: paramsCnpj,
    razaoSocial: "",
  };

  const [cliente, setCliente] = useState<IEstab>(initialObject);
  const [matriz, setMatriz] = useState<IEstab>(initialObject);

  useEffect(() => {
    const fetch = async () => {
      const matriz = await getData(
        "credenciamentos/clientes/filiais",
        paramsCnpj
      );

      const filial = await getData(
        "credenciamentos/clientes/identificacoes",
        paramsCnpj
      );

      const updatedFilial = {
        cnpj: paramsCnpj,
        razaoSocial: filial[0]["Razão social"],
      };

      setCliente(updatedFilial);

      if (matriz.length > 0) {
        const identificacao = await getData(
          "credenciamentos/clientes/identificacoes",
          matriz[0]["Matriz"]
        );

        const updatedMatriz = {
          cnpj: matriz[0]["Matriz"],
          razaoSocial: identificacao[0]["Razão social"],
        };

        setMatriz(updatedMatriz);
      }
    };

    fetch();
  }, []);

  const handleClickDesvincular = () => {
    const data = {
      id: cliente.cnpj,
    };
    
    REMOVE_Filial(data);
  };

  const handleClickCancel = () => {
    setModal("");
    setType("");
  };

  return (
    <ModalStructure modalVariant="ComponentsArea">
      <Text
        fontText="Filial"
        variant="h1"
        icon={faBuildingFlag}
        theme="default"
      />
      <div className="modal-interactive__content">
        <div style={{ alignItems: "center", display: "flex", gap: ".5rem" }}>
          <Text fontText="Matriz: " variant="h2"/>
          <Text
            fontText={`${cnpjMask(matriz.cnpj)} - ${matriz.razaoSocial}`}
            variant="h3"
          />
        </div>
        <div style={{ alignItems: "center", display: "flex", gap: ".5rem" }}>
          <Text fontText="Filial: " variant="h2" />
          <Text
            fontText={`${cnpjMask(cliente.cnpj)} - ${cliente.razaoSocial}`}
            variant="h3"
          />
        </div>
        <div className="modal-interactive__content__button">
          <Button fontText="Cancelar" onClick={() => handleClickCancel()} />
          <Button
            fontText="Desvincular"
            variant="danger"
            onClick={handleClickDesvincular}
          />
        </div>
      </div>
    </ModalStructure>
  );
};

export default DesvincularFilial;
