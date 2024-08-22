import AddStatus from "../../../components/Modals/Add/AddStatus";
import { ModalProvider } from "../../../hooks/context/useModalContext";

import { StatusProvider } from "../../../hooks/context/useStatusContext";

const Status = () => {
  return (
    <StatusProvider>
      <ModalProvider>
        <AddStatus />
      </ModalProvider>
    </StatusProvider>
  );
};

export default Status;
