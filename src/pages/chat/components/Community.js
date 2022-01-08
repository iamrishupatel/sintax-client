import { useContext } from "react";
import { ChatContext } from "../../../context/chatContext";

const Community = ({ community, onClick }) => {
  const { selectedCommunity } = useContext(ChatContext);

  let active = selectedCommunity._id === community._id ? true : false;

  return (
    <div
      className={active ? "community active" : "community"}
      onClick={onClick}
    >
      <img src={community.photoUrl} alt={community.name} />

      <h4 className="community-name">{community.name}</h4>
    </div>
  );
};

export default Community;
