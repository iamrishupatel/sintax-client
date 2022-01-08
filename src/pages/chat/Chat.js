import { useState } from "react";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import CommunitiesPanel from "./components/CommunitiesPanel";
import ChatPanel from "./components/ChatPanel";
import ChatContextProvider from "../../context/chatContext";

const Chat = () => {
  useDocumentTitle("Chat | Sintax");
  const [isSidePanelVisible, setIsSidePanelVisible] = useState(false);
  return (
    <ChatContextProvider>
      <div className="chat-container d-flex-center">
        <div className="chat">
          <CommunitiesPanel
            visible={isSidePanelVisible}
            setVisible={setIsSidePanelVisible}
          />
          <ChatPanel setIsSidePanelVisible={setIsSidePanelVisible} />
        </div>
      </div>
    </ChatContextProvider>
  );
};

export default Chat;
