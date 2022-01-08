import { useContext } from "react";
import { ChatContext } from "../../../context/chatContext";
import Community from "./Community";
import { ArrowLeftOutlined } from "@ant-design/icons";

const CommunitiesPanel = ({ visible, setVisible }) => {
  const { communities, setSelectedCommunity } = useContext(ChatContext);

  const closeCommunities = () => {
    setVisible(false);
  };

  const selectCommunity = id => {
    setSelectedCommunity(() =>
      communities.find(community => community._id === id)
    );
    closeCommunities();
  };
  return (
    <div className={visible ? "communities-panel active" : "communities-panel"}>
      <div className="header">
        <ArrowLeftOutlined className="header-icon" onClick={closeCommunities} />
        <h2>Communities</h2>
      </div>
      <div className="communities-panel-list ">
        {communities.length > 0 &&
          communities.map(community => (
            <Community
              key={community._id}
              community={community}
              onClick={() => selectCommunity(community._id)}
            />
          ))}
      </div>
    </div>
  );
};

export default CommunitiesPanel;
