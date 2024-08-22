import { ModalProvider } from "../../hooks/context/useModalContext";
import ModalMyProfile from "../../components/Modals/MyProfile";

const MyProfile = () => {
  return (
    <ModalProvider>
      <ModalMyProfile />
    </ModalProvider>
  );
};

export default MyProfile;
