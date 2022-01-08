import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Link } from "react-router-dom";
import { PostContext } from "../../context/postContext";
import { format } from "date-fns/esm";
import { useNavigate } from "react-router-dom";

// components
import Stats from "./Stats";

// antd
import {
  GlobalOutlined,
  DeleteOutlined,
  MoreOutlined,
  FlagOutlined,
} from "@ant-design/icons";
import { Menu, Dropdown } from "antd";

const Post = React.forwardRef(({ post }, ref) => {
  let navigate = useNavigate();

  const { user } = useContext(UserContext);
  const { deletePost } = useContext(PostContext);
  const timestamp = format(new Date(post.createdAt.toString()), "PPp");
  const fullName = `${post.author.firstName} ${post.author.lastName}`;
  const navigateToPost = () => {
    navigate(`/post/${post._id}`);
  };

  const deletePostHandler = () => {
    deletePost(post._id);
  };

  const reportHandler = () => {
    // TODO:
  };

  const dropdownMenu = (
    <Menu>
      <Menu.Item key="1" onClick={reportHandler}>
        <FlagOutlined style={{ marginRight: ".3rem" }} /> Report
      </Menu.Item>
      {user._id === post.author._id && (
        <Menu.Item key="0" onClick={deletePostHandler}>
          <DeleteOutlined style={{ marginRight: ".3rem" }} /> Delete
        </Menu.Item>
      )}
    </Menu>
  );

  return (
    <div className="post" ref={ref}>
      {/* ========== Header ========= */}
      <div className="post__user d-flex align-center">
        <img src={post.author.photoUrl} alt={fullName} className="userImg" />
        <div className="d-flex flex-col">
          <Link to={`/user/${post.author._id}`} className="username">
            {fullName}
          </Link>
          <span className="timestamp">
            <GlobalOutlined style={{ marginRight: "6px" }} />
            {timestamp}
          </span>
        </div>
        <div className="flex-spacer" />
        <Dropdown
          overlay={dropdownMenu}
          placement="bottomRight"
          trigger={["click"]}
          className="post__dropdown"
        >
          <MoreOutlined className="icon pointer" />
        </Dropdown>
      </div>
      {/* ========== BODY ========= */}
      <div className="post__content" onClick={navigateToPost}>
        <p>{post.body}</p>
      </div>
      {post.photo && (
        <div className="d-flex-center" onClick={navigateToPost}>
          <img src={post.photo.url} alt="post" className="post__img" />
        </div>
      )}
      {/* ========== STATS / META DATA  ========= */}
      <Stats post={post} />
    </div>
  );
});

export default Post;
