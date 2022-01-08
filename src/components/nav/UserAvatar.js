import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

const UserAvatar = () => {
  const { user } = useContext(UserContext);
  if (user && user._id) {
    return (
      <Link
        to={`/user/${user._id}`}
        className="userAvatar d-flex align-center "
      >
        <img src={user.photoUrl} alt={user.firstName} />
        <h4 className="user__name">{user.firstName}</h4>
      </Link>
    );
  }
  return null;
};

export default UserAvatar;
