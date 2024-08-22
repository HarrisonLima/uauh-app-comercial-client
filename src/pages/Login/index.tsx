import ModalLogin from "../../components/Modals/Login";
import { LoginProvider } from "../../hooks/context/useLoginContext";

const Login = () => {
  return (
    <LoginProvider>
      <div className="login">
        <ModalLogin />
      </div>
    </LoginProvider>
  );
};

export default Login;
