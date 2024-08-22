import IEvents from "../../interfaces/IEvents";
import Icon from "../Icon";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

const Button = ({
  variant = "primary",
  fontText,
  icon,
  onClick,
}: IEvents & {
    variant?: "alert" | "danger" | "disabled" | "primary" | "sucess";
  } & { icon?: IconDefinition } & { fontText: string }) => {
  return (
    <button
      className={`button button--${variant}`}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (onClick) {
          onClick();
        }
      }}
    >
      {fontText}
      {icon ? <Icon icon={icon} color="white" variant="button" /> : null}
    </button>
  );
};

export default Button;
