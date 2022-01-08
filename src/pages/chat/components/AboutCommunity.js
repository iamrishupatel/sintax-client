import { useContext } from "react";
import { ChatContext } from "../../../context/chatContext";

const AboutCommunity = () => {
  const { selectedCommunity } = useContext(ChatContext);
  
  return (
    <div className="about-community">
      <div className="about-community__header">
        <div className="img">
          <img
            src={selectedCommunity.photoUrl}
            alt={selectedCommunity.name}
          />
        </div>
        <h2>{selectedCommunity.name}</h2>
      </div>

      <div className="description">
        <h3>Description</h3>
        <p>{selectedCommunity.description}</p>
      </div>
    </div>
  );
};

export default AboutCommunity;
