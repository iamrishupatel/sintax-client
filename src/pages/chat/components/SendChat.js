import { useState, useContext } from "react";
import { UserContext } from "../../../context/userContext";
import { ChatContext } from "../../../context/chatContext";

const SendChat = ({prevMesseges}) => {
  const { user } = useContext(UserContext);
  const { sendChat } = useContext(ChatContext);
  const [message, setMessage] = useState({
    body: "",
    author: user._id,
  });
  const handleChange = e => {
    setMessage(prevState => ({
      ...prevState,
      body: e.target.value,
    }));
  };
  const handleSubmit = e => {
    e.preventDefault();
    sendChat(message)
      .then(res => res)
      .catch(error => console.log(error))
      .finally(() => {
        setMessage(prevState => ({
          ...prevState,
          body: "",
        }));
      });
  };
  return (
    <form className="send-chat d-flex align-center" onSubmit={handleSubmit}>
      <input
        type="text"
        name="message"
        placeholder="Enter your message"
        value={message.body}
        onChange={handleChange}
        autoComplete="off"
      />
      <button>Send </button>
    </form>
  );
};

export default SendChat;
