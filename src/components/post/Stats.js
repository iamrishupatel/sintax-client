import { useState, useContext, useEffect, useRef } from "react";
import { PostContext } from "../../context/postContext";
import { UserContext } from "../../context/userContext";
import {
  MessageOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import likeSound from "../../assets/like.mp3";
import LikeGroup from "./LikeGroup";
import { Link } from "react-router-dom";

const Stats = ({ post }) => {
  const { updatePost } = useContext(PostContext);
  const { user } = useContext(UserContext);

  const [isLiked, setIsLiked] = useState(false);
  const audioRef = useRef();
  const playSound = () => {
    audioRef.current.play();
  };
  useEffect(() => {
    setIsLiked(() =>
      post.likes.some(likedBy => likedBy.toString() === user._id)
    );
  }, [post.likes, user._id]);
  const unlikeHandler = () => {
    let data = {
      likes: post.likes.filter(likedBy => likedBy !== user._id),
    };
    updatePost(post._id, data);
  };
  const likeHandler = () => {
    let data = {
      likes: [...post.likes, user._id],
    };
    playSound();
    updatePost(post._id, data);
  };
  return (
    <div className="post__stats d-flex">
      <audio id="post__audio" src={likeSound} ref={audioRef} />
      <div className="d-flex align-center">
        {isLiked ? (
          <HeartFilled
            className="icon icon-filled pointer"
            onClick={unlikeHandler}
          />
        ) : (
          <HeartOutlined className="icon pointer" onClick={likeHandler} />
        )}
        <span className="data">{post.likes ? post.likes.length : 0}</span>
        <LikeGroup likes={post.likes} />
      </div>

      <div className="d-flex">
        <Link to={`/post/${post._id}`} className="d-flex align-center">
          <MessageOutlined className="icon" />
        </Link>
      </div>

      <div className="flex-spacer" />
    </div>
  );
};

export default Stats;
