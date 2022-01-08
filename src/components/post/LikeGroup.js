import { useState, useEffect, Fragment } from "react";
import { Avatar, Tooltip } from "antd";
import { getAllUsers } from "../../servercalls/user";

const LikeGroup = ({ likes }) => {
  const [likesData, setLikesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const queries = {
      $select: ["firstName", "lastName", "photoUrl"],
      _id: {
        $in: likes,
      },
    };
    getAllUsers(queries)
      .then(users => {
        setLikesData(users);
        setLoading(false);
      })
      .catch(error => console.log(error));
    return () => setLoading(true);
  }, [likes]);

  if (loading) return null;
  return (
    <Fragment>
      <Avatar.Group maxCount={4} size="medium" className="like-group" maxStyle>
        {likesData &&
          likesData.length > 0 &&
          likesData.map(user => (
            <Tooltip key={user._id} title={user.firstName} placement="top">
              <Avatar
                src={user.photoUrl}
                className="like-group__avatar"
                gap="1"
              />
            </Tooltip>
          ))}
      </Avatar.Group>
    </Fragment>
  );
};

export default LikeGroup;
