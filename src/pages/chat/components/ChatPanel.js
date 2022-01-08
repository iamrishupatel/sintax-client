import { Fragment, useContext, useState } from "react";
import { ChatContext } from "../../../context/chatContext";
import ChatHeader from "./ChatHeader";
import ChatWindow from "./ChatWindow";
import SendChat from "./SendChat";
import AboutCommunity from "./AboutCommunity";
import { Drawer } from "antd";
import { MessageOutlined } from "@ant-design/icons";

const ChatPanel = ({ setIsSidePanelVisible }) => {
  const { selectedCommunity } = useContext(ChatContext);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const showcommunities = () => {
    setIsSidePanelVisible(true);
  };
  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };

  return (
    <div className="chat-window-container">
      {selectedCommunity._id ? (
        <Fragment>
          <ChatHeader
            setIsDrawerVisible={setIsDrawerVisible}
            showcommunities={showcommunities}
          />
          <ChatWindow />
          <SendChat />
        </Fragment>
      ) : (
        <div className="chat-window-placeholder">
          <div>
            <MessageOutlined />
          </div>
          <p onClick={showcommunities}>Select a community</p>
        </div>
      )}

      <Drawer
        placement="right"
        onClose={closeDrawer}
        visible={isDrawerVisible}
        getContainer={false}
        style={{ position: "absolute" }}
        width={300}
      >
        <AboutCommunity />
      </Drawer>
    </div>
  );
};

export default ChatPanel;
