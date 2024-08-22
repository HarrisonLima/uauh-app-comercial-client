import { useLoginContext } from "../../hooks/context/useLoginContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useModalContext } from "../../hooks/context/useModalContext";
import useNavigateToLocation from "../../hooks/useNavigateToLocation";
import useLocalStorage from "../../storage/LocalStorage";
import useCookies from "../../storage/Cookies";
import Connection from "../connection";

const useLogin = () => {
  const { ADD_LocalStorage, GET_LocalStorage, REMOVE_LocalStorage } =
    useLocalStorage();
  const { ADD_Profile, REMOVE_Profile } = useCookies();
  const { data } = useLoginContext();
  const { setModal, setType } = useModalContext();
  const navigate = useNavigateToLocation();

  const Login = async () => {
    if (data.user !== "" && data.password !== "") {
      try {
        const response = await fetch(`${Connection()}auth`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const responseData = await response.json();
        if (response.ok) {
          const token = responseData.token;
          ADD_LocalStorage("Token JWT", JSON.stringify(token));
          ADD_Profile(responseData.userDb);
          navigate("/home");
        } else {
          setType("Message");
          setModal("NaoAutorizado");
        }
      } catch (error: any) {
        setType("Message");
        setModal("FalhaRequisicao");
      }
    } else {
      setType("Message");
      setModal("FalhaRequisicao");
    }
  };

  const Logout = () => {
    REMOVE_LocalStorage("Token JWT");
    REMOVE_Profile();
    navigate("/login");
  };

  const TokenValidation = () => {
    const navigate = useNavigate();
    useEffect(() => {
      const verifyToken = async () => {
        try {
          const token = GET_LocalStorage("Token JWT");

          if (!token) {
            navigate("/login");
            return;
          }

          const response = await fetch(`${Connection()}token`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token.replace(/"/g, "")}`,
            },
          });

          if (!response.ok) {
            throw Error;
          }

          const responseData = await response.json();
          ADD_Profile(responseData.user);
        } catch (error) {
          setType("Message");
          setModal("FalhaRequisicao");
          Logout();
          throw new Error(`Erro ao validar token: ${error}`);
        }
      };

      verifyToken();
    }, [navigate]);

    return null;
  };

  return {
    Login,
    Logout,
    TokenValidation,
  };
};

export default useLogin;
