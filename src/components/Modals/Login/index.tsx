import { useState } from "react";
import Button from "../../Button";
import Checkbox from "../../Checkbox";

import Input from "../../Input";

import Logo from "../../Logo";
import ModalStructure from "../Structure";
import Text from "../../Text";
import useLogin from "../../../api/auth";
import { useLoginContext } from "../../../hooks/context/useLoginContext";
import ModalMessage from "../../../utility/ModalMessage";
import { useModalContext } from "../../../hooks/context/useModalContext";

const ModalLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { data, setUser, setPassword } = useLoginContext();
  const { Login } = useLogin();
  const { modal } = useModalContext();

  const handleChangeUsuario = (usuario: any[]) => {
    setUser(usuario[0]);
  };

  const handleChangeSenha = (senha: any[]) => {
    setPassword(senha[0]);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <ModalStructure internalPadding={false} modalVariant="ComponentsArea">
        <header className="logo__box">
          <Logo variant="static" />
        </header>
        <div className="modal-login__content">
          <div className="modal-login__content__header">
            <h1 className="modal-login__content__header__title">Login</h1>
            <Text
              fontText="Acesse com seu usuário e senha"
              variant="h3"
              fontSize="1.125rem"
            />
          </div>
          <form>
            <Input
              placeholder="Digite seu usuário..."
              type="text"
              characters="all"
              label="Usuário"
              size="lg"
              value={data.user}
              onChange={handleChangeUsuario}
            />
            <Input
              placeholder="Digite sua senha..."
              type={showPassword ? "text" : "password"}
              characters="all"
              size="lg"
              label="Senha"
              value={data.password}
              onChange={handleChangeSenha}
            />
            <Checkbox
              fontText="Mostrar senha"
              onChange={togglePasswordVisibility}
            />
          </form>
          <div className="modal-login__content__button">
            <Button fontText="Entrar" onClick={Login} />
          </div>
        </div>
      </ModalStructure>
      <section
        className="modal-box-overlay"
        aria-hidden={modal.modal !== "" && modal.type === "Message"}
      >
        {ModalMessage()}
      </section>
    </>
  );
};

export default ModalLogin;
