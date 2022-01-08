import { ArrowLeftOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { ChatContext } from "../../../context/chatContext";
const ChatHeader = ({ setIsDrawerVisible, showcommunities }) => {
  const { selectedCommunity } = useContext(ChatContext);
  return (
    <div className="chat-header d-flex align-center ">
      <div className="community-name">
        <ArrowLeftOutlined
          className="chat-header__back"
          onClick={showcommunities}
        />
        <div
          className="d-flex align-center"
          onClick={() => setIsDrawerVisible(true)}
        >
          <img src={selectedCommunity.photoUrl} alt={selectedCommunity.name} />
          <h4 className="user-name">{selectedCommunity.name}</h4>{" "}
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
