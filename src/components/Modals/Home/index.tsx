import ModalStructure from "../Structure";
import video from "../../../assets/video-marca-uauh.mp4";

const ModalHome = () => {
  return (
    <ModalStructure> 
      <video
        src={video}
        title="Vídeo de apresentação"
        autoPlay
        loop
        muted
        controls
        style={{ width: "100%", height: "100%", border: "none", borderRadius: ".5rem" }}
      ></video>
    </ModalStructure>
  );
};

export default ModalHome;
