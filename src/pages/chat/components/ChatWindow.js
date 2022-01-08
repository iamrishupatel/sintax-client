import Message from "./Message";
import { useContext } from "react";
import { UserContext } from "../../../context/userContext";
import { DoubleRightOutlined } from "@ant-design/icons";
import { ChatContext } from "../../../context/chatContext";

const ChatWindow = () => {
  const { user } = useContext(UserContext);
  const { messages } = useContext(ChatContext);

  const trackScrolling = e => {
    if (e.target.scrollTop > -30) {
      document
        .querySelector(".chat-window__go-down")
        .classList.remove("active");
    } else {
      document.querySelector(".chat-window__go-down").classList.add("active");
    }
  };

  const goToBottom = () => {
    const chatWindow = document.querySelector(".chat-window");
    chatWindow.scrollTop = chatWindow.scrollHeight;
  };
  return (
    <div className="chat-window scroll-y" onScroll={trackScrolling}>
      {messages.map(message => {
        if (message.author._id === user._id) {
          return (
            <Message
              key={message._id}
              type="sent"
              message={message.body}
              author={message.author}
            />
          );
        } else {
          return (
            <Message
              key={message._id}
              type="received"
              message={message.body}
              author={message.author}
            />
          );
        }
      })}
      <div className="chat-window__go-down d-flex-center" onClick={goToBottom}>
        <DoubleRightOutlined />
      </div>
    </div>
  );
};

export default ChatWindow;
