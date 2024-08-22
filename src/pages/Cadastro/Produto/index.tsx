import { ProdutoProvider } from "../../../hooks/context/useProdutoContext";
import AddProduto from "../../../components/Modals/Add/AddProduto";
import { ModalProvider } from "../../../hooks/context/useModalContext";

const Produto = () => {
  return (
    <ProdutoProvider>
      <ModalProvider>
        <AddProduto />
      </ModalProvider>
    </ProdutoProvider>
  );
};

export default Produto;
