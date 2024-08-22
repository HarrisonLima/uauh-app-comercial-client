import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import Icon from "../Icon";

const Text = ({
  fontText,
  theme = "default",
  variant,
  icon,
}: { fontText: string } & { variant: "h1" | "h2" | "h3" } & {
  theme?: "alert" | "danger" | "disabled" | "default" | "sucess";
} & { icon?: IconDefinition }) => {
  const iconColor = () => {
    switch (theme) {
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

  switch (variant) {
    case "h1":
      return (
        <div className="heading--primary__container">
          <Icon icon={icon} color={iconColor()} />
          <h1 className={`heading--primary heading--primary--${theme}`}>
            {fontText}
          </h1>
        </div>
      );
    case "h2":
      return <h2 className="heading--secondary">{fontText}</h2>;
    case "h3":
      return <h3 className="heading--tertiary">{fontText}</h3>;
  }
};

export default Text;
