import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import useLogin from "../../api/auth";
import Icon from "../Icon";

const Exit = () => {
  const { Logout } = useLogin();

  return (
    <div className="exit" onClick={Logout}>
      <Icon icon={faArrowRightFromBracket} color="red" variant="button" />
      <p>Sair</p>
    </div>
  );
};

export default Exit;
