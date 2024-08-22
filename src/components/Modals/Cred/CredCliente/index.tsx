import { useState } from "react";
import { faBuilding, faSearch } from "@fortawesome/free-solid-svg-icons";
import useNavigateToLocation from "../../../../hooks/useNavigateToLocation";

import ModalStructure from "../../Structure";
import Input from "../../../Input";
import Icon from "../../../Icon";
import Text from "../../../Text";
import getData from "../../../../api/Restfull/get";
import useCookies from "../../../../storage/Cookies";
import useMask from "../../../../hooks/useMask";

const CredCliente = () => {
  const [cnpj, setCnpj] = useState("");
  const { GET_Profile } = useCookies();
  const profile = GET_Profile();
  const { clearCnpjMask } = useMask();

  const navigate = useNavigateToLocation();

  const handleNavigate = () => {
    if (cnpj[0] !== "" && cnpj[0] !== undefined && cnpj[1] !== "Invalid") {
      const fetch = async () => {
        const status = await getData(
          "credenciamentos/clientes/status",
          clearCnpjMask(cnpj[0])
        );

        if (
          status.length === 0 ||
          status[0]["Credenciador"] === `${profile.nome}(${profile.usuario})`
        ) {
          navigate(
            `/credenciamento/cliente/identificacao/${cnpj[0].replace(
              /[-/."]/g,
              ""
            )}`
          );
        } else {
          navigate(`/credenciamento/cliente/revisao/${clearCnpjMask(cnpj[0])}`);
        }
      };

      fetch();
    }
  };

  return (
    <ModalStructure modalVariant="ComponentsArea">
      <Text fontText="Credenciamento cliente" variant="h1" icon={faBuilding} />
      <div className="cliente__content">
        <Text fontText="Insira o documento do cliente" variant="h3" />
        <div className="cliente__content__search">
          <Input
            type="text"
            characters="value"
            label="CNPJ"
            length={[18]}
            name="CNPJ"
            placeholder="00.000.000/0000-00"
            validationType="CNPJ"
            size="lg"
            value={cnpj[0]}
            onChange={setCnpj}
          />
          <span className="cliente__content__search__icon">
            <Icon
              icon={faSearch}
              variant="button"
              onClick={() => handleNavigate()}
            />
          </span>
        </div>
      </div>
    </ModalStructure>
  );
};

export default CredCliente;
