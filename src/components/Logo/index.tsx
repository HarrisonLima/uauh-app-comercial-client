import useNavigateToLocation from "../../hooks/useNavigateToLocation";
import logo from "./assets/logo.png";

const Logo = ({
  variant = "navigate",
}: {
  variant?: "navigate" | "static";
}) => {
  const navigate = useNavigateToLocation();

  const handleNavigate = () => {
    navigate("/home");
  };

  return (
    <img
      className="logo"
      src={logo}
      alt="Logo da empresa"
      onClick={() => (variant === "navigate" ? handleNavigate() : "")}
    />
  );
};

export default Logo;
