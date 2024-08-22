import { faEye, faEyeSlash, faUser } from "@fortawesome/free-solid-svg-icons";
import ModalStructure from "../Structure";
import Text from "./../../Text/index";
import Input from "../../Input";
import Button from "../../Button";
import useCookies from "../../../storage/Cookies";
import { useEffect, useState } from "react";
import { useModalContext } from "../../../hooks/context/useModalContext";
import ModalMessage from "../../../utility/ModalMessage";
import postData from "../../../api/Restfull/post";
import getData from "../../../api/Restfull/get";
import useUsuario from "../../../hooks/operators/useUsuario";
import Icon from "../../Icon";

const ModalMyProfile = () => {
  const { GET_Profile } = useCookies();
  const profile = GET_Profile();
  const { modal, setModal, setType } = useModalContext();
  const { UPDATE_Usuario } = useUsuario();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [matchPassword, setMatchPassword] = useState(false);
  const [invalidNewPassword, setInvalidNewPassword] = useState(false);
  const [invalidConfirmPassword, setInvalidConfirmPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [windowWidth] = useState(window.innerWidth);

  const [usuario, setUsuario] = useState<{
    id: string;
    Nome: string;
    Usuário: string;
    ["Perfil Acesso"]: string;
    Situação: string;
  }>({
    id: "",
    Nome: "",
    Usuário: "",
    ["Perfil Acesso"]: "",
    Situação: "",
  });

  useEffect(() => {
    const fetch = async () => {
      const usuarios = await getData("/usuarios");
      const user = usuarios.find(
        (user: {
          id: string;
          Nome: string;
          Usuário: string;
          ["Perfil Acesso"]: string;
          Situação: string;
        }) => user.Usuário === profile.usuario
      );
      if (user) {
        setUsuario(user);
      } else {
        console.error("Usuário não encontrado.");
      }
    };

    fetch();
  }, []);

  useEffect(() => {
    setMatchPassword(
      newPassword !== "" &&
        confirmNewPassword !== "" &&
        newPassword === confirmNewPassword
    );
  }, [newPassword, confirmNewPassword]);

  const handleClick = () => {
    const fetch = async () => {
      await postData("/auth-no-acess", {
        user: usuario.Usuário,
        password: currentPassword,
      })
        .then(() => {
          const data = {
            id: usuario.id,
            usuario: usuario.Usuário,
            nome: usuario.Nome,
            senha: newPassword,
            perfilAcesso: usuario["Perfil Acesso"],
            situacao: usuario.Situação,
          };

          UPDATE_Usuario(data);
        })
        .catch((error) => {
          console.log(`Erro na requisição: ${error}`);
        });
    };

    if (
      currentPassword !== "" &&
      newPassword !== "" &&
      confirmNewPassword !== ""
    ) {
      if (invalidNewPassword === true || invalidConfirmPassword === true) {
        setType("Message");
        return setModal("InformacoesInvalidas");
      }

      if (matchPassword === false) {
        setType("Message");
        return setModal("SenhasNaoCorrespondentes");
      }

      fetch();
    } else {
      setType("Message");
      return setModal("PreencherTodosCampos");
    }
  };

  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };
  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <ModalStructure modalVariant="ComponentsArea">
        <Text fontText="Meu perfil" icon={faUser} variant="h1" />
        <div className="modal-my-profile__content">
          <Text
          variant="h2"
            fontText={`${profile.nome}(${profile.usuario}) - ${profile.perfil}`}
          />
          <form>
            <div className="modal-my-profile__content__input">
              <Input
                label="Senha atual"
                type={showCurrentPassword ? "text" : "password"}
                size={windowWidth <= 480 ? "xl" : "lg"}
                name="Senha"
                value={currentPassword}
                onChange={(value: any[]) => {
                  setCurrentPassword(value[0]);
                }}
              />
              <span className="modal-my-profile__content__input__icon">
                <Icon
                  icon={showCurrentPassword ? faEyeSlash : faEye}
                  variant="button"
                  onClick={toggleCurrentPasswordVisibility}
                />
              </span>
            </div>
            <div className="modal-my-profile__content__input">
              <Input
                label="Nova senha"
                type={showNewPassword ? "text" : "password"}
                characters="all"
                validationType="Password"
                length={[20, 8]}
                value={newPassword}
                onChange={(value: any[]) => {
                  value[1] === "Invalid"
                    ? setInvalidNewPassword(true)
                    : setInvalidNewPassword(false);
                  setNewPassword(value[0]);
                }}
                size={windowWidth <= 480 ? "xl" : "lg"}
              />
              <span className="modal-my-profile__content__input__icon">
                <Icon
                  icon={showNewPassword ? faEyeSlash : faEye}
                  variant="button"
                  onClick={toggleNewPasswordVisibility}
                />
              </span>
            </div>
            <div className="modal-my-profile__content__input">
              <Input
                label="Confirmar senha"
                type={showConfirmPassword ? "text" : "password"}
                characters="all"
                validationType="Password"
                length={[20, 8]}
                value={confirmNewPassword}
                onChange={(value: any[]) => {
                  value[1] === "Invalid"
                    ? setInvalidConfirmPassword(true)
                    : setInvalidConfirmPassword(false);
                  setConfirmNewPassword(value[0]);
                }}
                size={windowWidth <= 480 ? "xl" : "lg"}
              />
              <span className="modal-my-profile__content__input__icon">
                <Icon
                  icon={showConfirmPassword ? faEyeSlash : faEye}
                  variant="button"
                  onClick={toggleConfirmPasswordVisibility}
                />
              </span>
            </div>
          </form>
          <div className="modal-my-profile__content__button-box">
            <Button fontText="Salvar" variant="sucess" onClick={handleClick} />
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

export default ModalMyProfile;
