interface IModal {
  children: React.ReactNode;
  internalPadding?: boolean;
  modalVariant?: "FullArea" | "ComponentsArea"
}

const ModalStructure = ({
  children,
  internalPadding = true,
  modalVariant = "FullArea",
}: IModal) => {
  return (
    <div
      className={`modal-structure ${
        internalPadding ? "modal-structure--breath" : ""
      } modal-structure--${modalVariant == "FullArea" ? "full" : "components"}`}
    >
      {children}
    </div>
  );
};

export default ModalStructure;
