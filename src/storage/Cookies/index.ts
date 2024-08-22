const useCookies = () => {
  const ADD_Profile = (user: any) => {
    const profile = {
      usuario: user.usuario,
      nome: user.nome,
      perfil: user.perfil_acesso,
    };

    const profileString = JSON.stringify(profile);

    document.cookie = "perfil=" + profileString + "; path=/";
  };

  const GET_Profile = () => {
    const profile = { usuario: "", nome: "", perfil: "" };
    const cookieValue = document.cookie.replace(
      /(?:(?:^|.*;\s*)perfil\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    return cookieValue ? JSON.parse(cookieValue) : profile;
  };

  const REMOVE_Profile = () => {
    document.cookie = "perfil=; path=/;";
  };

  return {
    ADD_Profile,
    GET_Profile,
    REMOVE_Profile,
  };
};

export default useCookies;
