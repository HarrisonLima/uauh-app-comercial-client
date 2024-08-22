import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import IEvents from "../../interfaces/IEvents";

interface IIcon {
  icon?: IconDefinition;
}

const Icon = ({
  color = "primary",
  icon,
  title,
  variant = "static",
  size = "md",
  onClick,
}: IIcon &
  IEvents & { size?: "sm" | "md" | "lg" } & {
    color?: "black" | "gray" | "green" | "orange" | "primary" | "red" | "white";
  } & {
    variant?: "button" | "static";
  } & { title?: string }) => {
  return (
    <span
      className={`icon icon--${size} icon--${color} icon--${variant}`}
      onClick={onClick}
      title={title}
    >
      {icon ? (
        <FontAwesomeIcon
          icon={icon}
          style={{ height: "100%", width: "100%" }}
        />
      ) : null}
    </span>
  );
};

export default Icon;
