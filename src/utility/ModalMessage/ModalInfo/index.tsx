import { useModalContext } from "../../../hooks/context/useModalContext";
import { faClock, IconDefinition } from "@fortawesome/free-solid-svg-icons";

import ModalStructure from "../../../components/Modals/Structure";
import Icon from "../../../components/Icon";
import Text from "../../../components/Text";
import Button from "../../../components/Button";

const ModalInfo = ({
  variant = "default",
  title,
  fontText,
  icon,
  reload = true,
}: { icon: IconDefinition } & { fontText: string } & { title?: string } & {
  variant: "alert" | "danger" | "default" | "disabled" | "sucess";
} & { reload?: boolean }) => {
  const { setModal, setType } = useModalContext();

  const handleClose = () => {
    setType("");
    setModal("");

    if (reload === true) {
      window.location.reload();
    }
  };

  const iconColor = () => {
    switch (variant) {
      case "alert":
        return "orange";
      case "danger":
        return "red";
      case "default":
        return "primary";
      case "disabled":
        return "gray";
      case "sucess":
        return "green";
      default:
        return "black";
    }
  };

  return (
    <ModalStructure modalVariant="ComponentsArea">
      <div className="modal-info__content">
        <div className="modal-info__content__title">
          <Text icon={faClock} variant="h1" theme={variant} fontText={title!} />
        </div>
        <div className="modal-info__content__subtitle">
          <div className="modal-info__content__message">
            <Text fontText={fontText} variant="h3" />
          </div>
        </div>
        <div className="modal-info__content__icon">
          <Icon icon={icon} color={iconColor()} size="lg" />
        </div>
        <div className="modal-info__content__button">
          <Button fontText="Ok" onClick={handleClose} />
        </div>
      </div>
    </ModalStructure>
  );
};

export default ModalInfo;
