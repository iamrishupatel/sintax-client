import { Link } from "react-router-dom";

const Message = ({ type, message, author }) => {
  const fullName = `${author.firstName} ${author.lastName}`;
  return (
    <div className={`chat-message message-${type}`}>
      <div className="message">
        <span>
          {type === "received" ? (
            <Link to={`/user/${author._id}`}>{fullName}</Link>
          ) : (
            "You"
          )}
        </span>
        <p>{message}</p>
      </div>
      {type === "received" && (
        <img src={author.photoUrl} alt={fullName} className="user-image" />
      )}
    </div>
  );
};

export default Message;
