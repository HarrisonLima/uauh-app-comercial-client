import { faGear } from "@fortawesome/free-solid-svg-icons";
import useNavigateToLocation from "../../hooks/useNavigateToLocation";
import useCookies from "../../storage/Cookies";
import Icon from "./../Icon/index";

const Profile = () => {
  const { GET_Profile } = useCookies();
  const profile = GET_Profile();
  const navigate = useNavigateToLocation();

  return (
    <>
      {profile.usuario !== "" ? (
        <div className="profile">
          <h2 className="heading--secondary">{profile ? profile.nome : ""}</h2>
          <div className="profile__sub">
            <h3 className="heading--tertiary">
              {profile ? profile.perfil : ""}
            </h3>
            <span className="profile__sub__icon">
              <Icon
                icon={faGear}
                color={"gray"}
                variant="button"
                onClick={() => navigate("/home/meu-perfil")}
              />
            </span>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Profile;
