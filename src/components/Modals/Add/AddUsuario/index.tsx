import { useEffect, useState } from "react";
import { useModalContext } from "../../../../hooks/context/useModalContext";
import { useUsuarioContext } from "../../../../hooks/context/useUsuarioContext";
import useUsuario from "../../../../hooks/operators/useUsuario";
import { faUser, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import getData from "../../../../api/Restfull/get";
import DropdownData from "../../../../utility/DropdownData";
import Button from "../../../Button";
import Dropdown from "../../../Dropdown";
import Icon from "../../../Icon";
import Input from "../../../Input";
import ModalMessage from "../../../../utility/ModalMessage";
import ModalStructure from "../../Structure";
import Text from "../../../Text";
import Checkbox from "../../../Checkbox";

const AddUsuario = () => {
  const { data, setPerfilAcesso, setUsuario, setSenha, setNome } =
    useUsuarioContext();
  const { ADD_Usuario } = useUsuario();

  const { modal, setModal, setType } = useModalContext();
  const [windowWidth] = useState(window.innerWidth);
  const [showPassword, setShowPassword] = useState(false);
  const [perfis, setPerfis] = useState<any[]>([]);
  const [invalidNome, setInvalidNome] = useState(false);
  const [invalidSenha, setInvalidSenha] = useState(false);
  const [invalidUsuario, setInvalidUsuario] = useState(false);
  const [keyVersion, setKeyVersion] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData("perfis");
      setPerfis(result);
    };
    fetchData();
  }, []);

  const handleChangeNome = (nome: any[]) => {
    setNome(nome[0]);
    nome[1] === "Invalid" ? setInvalidNome(true) : setInvalidNome(false);
  };
  const handleChangeSenha = (senha: any[]) => {
    setSenha(senha[0]);
    senha[1] === "Invalid" ? setInvalidSenha(true) : setInvalidSenha(false);
  };
  const handleChangeUsuario = (usuario: any[]) => {
    setUsuario(usuario[0]);
    usuario[1] === "Invalid"
      ? setInvalidUsuario(true)
      : setInvalidUsuario(false);
  };

  const handleButtonClick = () => {
    setType("Message");
    invalidNome || invalidSenha || invalidUsuario
      ? setModal("InformacoesInvalidas")
      : ADD_Usuario();
    toggleVersion();
  };

  const toggleVersion = () => {
    setKeyVersion((prevKey) => prevKey + 1);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleDropdown = (option: any) => {
    setPerfilAcesso(option.id);
  };

  return (
    <>
      <ModalStructure modalVariant="ComponentsArea">
        <Text variant="h1" icon={faUser} fontText="Cadastro usuário" />
        <div className="modal-add__content">
          <h3 className="heading--tertiary">
            Preencha o(s) campo(s) para realizar o cadastro.
          </h3>
          <form>
            <Input
              key={keyVersion}
              type="text"
              characters="all"
              name="Nome"
              label="Nome"
              length={[30, 3]}
              placeholder="Nome"
              value={data.nome}
              size={windowWidth <= 480 ? "xl" : "md"}
              onChange={handleChangeNome}
            />
            <Dropdown
              options={DropdownData(true, perfis, "Perfil Acesso")}
              fontText="Perfil"
              onChange={handleDropdown}
              size={windowWidth <= 480 ? "xl" : "md"}
            />
          </form>
          <form>
            <Input
              key={keyVersion + 1}
              type="text"
              characters="all"
              name="Usuário"
              label="Usuário"
              length={[20, 3]}
              placeholder="Usuário"
              value={data.usuario}
              size={windowWidth <= 480 ? "xl" : "md"}
              onChange={handleChangeUsuario}
            />
            <Input
              key={keyVersion + 2}
              type={showPassword ? "text" : "password"}
              characters="all"
              name="Senha"
              label="Senha"
              length={[20, 8]}
              placeholder="Senha"
              validationType="Password"
              value={data.senha}
              size={windowWidth <= 480 ? "xl" : "md"}
              onChange={handleChangeSenha}
            />
            {windowWidth <= 480 ? (
              <Checkbox
                fontText="Mostrar senha"
                onChange={togglePasswordVisibility}
              />
            ) : (
              <span className="modal-add__content__icon">
                <Icon
                  icon={showPassword ? faEyeSlash : faEye}
                  variant="button"
                  onClick={togglePasswordVisibility}
                />
              </span>
            )}
          </form>
          <details>
            <summary>Requisitos</summary>
            <ul>
              <li>
                <b>Nome:</b> Deve conter entre 03 e 30 caracteres.
              </li>
              <li>
                <b>Usuário:</b> Deve conter entre 03 e 20 caracteres.
              </li>
              <li>
                <b>Senha:</b> Deve conter: Número, letra maiúscula, letra
                minúscula, carácter especial, mín. 08 e máx. 20 caracteres.
              </li>
            </ul>
          </details>
          <div className="modal-add__content__button">
            <Button fontText="Cadastrar" onClick={handleButtonClick} />
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

export default AddUsuario;
