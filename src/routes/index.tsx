import { ModalProvider } from "../hooks/context/useModalContext";
import { EditProvider } from "../hooks/context/useEditContext";
import { ResetPassProvider } from "../hooks/context/useResetPassContext";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Login from "../pages/Login";
import Home from "../pages/Home";
import Default from "../pages/Default";
import NotFound from "../pages/NotFound";
import PerfilAcesso from "../pages/Cadastro/PerfilAcesso";
import Produto from "./../pages/Cadastro/Produto";
import Status from "./../pages/Cadastro/Status";
import Usuario from "./../pages/Cadastro/Usuario";

import ConsultaCliente from "../pages/Consulta/Cliente";
import Cliente from "./../pages/Credenciamento/Cliente";
import CredClienteIdentificacao from "../pages/Credenciamento/Cliente/Identificacao";
import CredClienteLocalizacao from "../pages/Credenciamento/Cliente/Localizacao";
import CredClienteRepresentantes from "../pages/Credenciamento/Cliente/Representantes";
import CredClienteCondicoesComerciais from "../pages/Credenciamento/Cliente/CondicoesComerciais";
import CredClienteRevisao from "../pages/Credenciamento/Cliente/Revisao";

import PerfisAcesso from "../pages/Listagem/PerfisAcesso";
import Produtos from "../pages/Listagem/Produtos";
import Statuss from "../pages/Listagem/Status";
import Usuarios from "../pages/Listagem/Usuarios";

import useLogin from "../api/auth";
import MyProfile from "../pages/MyProfile";

const Rotas = () => {
  const { TokenValidation } = useLogin();

  useEffect(() => {
    const handleBeforeUnload = () => {
      return TokenValidation();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  TokenValidation();

  return (
    <ModalProvider>
      <ResetPassProvider>
        <EditProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Default />}>
              <Route path="" element={<Home />} />
              <Route path="meu-perfil" element={<MyProfile />} />
            </Route>
            <Route path="/cadastro" element={<Default />}>
              <Route path="perfil-acesso" element={<PerfilAcesso />} />
              <Route path="produto" element={<Produto />} />
              <Route path="status" element={<Status />} />
              <Route path="usuario" element={<Usuario />} />
            </Route>
            <Route path="/consulta" element={<Default />}>
              <Route path="cliente" element={<ConsultaCliente />} />
            </Route>
            <Route path="/credenciamento" element={<Default />}>
              <Route path="cliente" element={<Cliente />} />
              <Route
                path="cliente/identificacao/:cnpj"
                element={<CredClienteIdentificacao />}
              />
              <Route
                path="cliente/localizacao/:cnpj"
                element={<CredClienteLocalizacao />}
              />
              <Route
                path="cliente/representantes/:cnpj"
                element={<CredClienteRepresentantes />}
              />
              <Route
                path="cliente/condicoes-comerciais/:cnpj"
                element={<CredClienteCondicoesComerciais />}
              />
              <Route
                path="cliente/revisao/:cnpj"
                element={<CredClienteRevisao />}
              />
            </Route>
            <Route path="/listagem" element={<Default />}>
              <Route path="perfis" element={<PerfisAcesso />} />
              <Route path="produtos" element={<Produtos />} />
              <Route path="status" element={<Statuss />} />
              <Route path="usuarios" element={<Usuarios />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </EditProvider>
      </ResetPassProvider>
    </ModalProvider>
  );
};

export default Rotas;
