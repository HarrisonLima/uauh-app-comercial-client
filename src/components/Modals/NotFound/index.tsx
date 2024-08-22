import useNavigateToLocation from "../../../hooks/useNavigateToLocation";
import Button from "../../Button";
import ModalStructure from "../Structure";
import Text from "../../Text";
import Logo from "../../Logo";

const ModalNotFound = () => {
  const navigate = useNavigateToLocation();

  const handleNavigate = () => {
    navigate("/home");
  };

  return (
    <ModalStructure modalVariant="ComponentsArea" internalPadding={false}>
      <header className="logo__box">
        <Logo variant="static" />
      </header>
      <div className="modal-not-found__content">
        <h5>404</h5>
        <span>
          <Text
            fontText="Ops! Algo deu errado. A página que você está tentando acessar não foi encontrada. Por favor, retorne à página principal e tente novamente. Se o problema persistir, entre em contato com nosso suporte. Agradecemos pela sua compreensão."
            variant="h3"
          />
        </span>
        <div className="modal-not-found__content__button">
          <Button fontText="Home" onClick={handleNavigate} />
        </div>
      </div>
    </ModalStructure>
  );
};

export default ModalNotFound;
