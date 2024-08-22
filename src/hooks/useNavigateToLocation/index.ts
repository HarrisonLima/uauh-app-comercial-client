import { useNavigate } from "react-router-dom";

const useNavigateToLocation = () => {
  const customNavigate = useNavigate();

  const navigate = (to: string) => {
    customNavigate(to);
  };

  return navigate;
};

export default useNavigateToLocation;
