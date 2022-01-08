import { Fragment, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Link } from "react-router-dom";
import { format } from "date-fns/esm";
import {
  CommentOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import CreateComment from "./CreateComment";
import EditComment from "./EditComment";
import { PostContext } from "../../context/postContext";
import { message } from "antd";

const Comment = ({ comment }) => {
  const { user } = useContext(UserContext);
  const { deleteComment } = useContext(PostContext);

  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const timestamp =
    comment.createdAt && format(new Date(comment.createdAt), "PPp");

  let nestedComments;
  if (comment.children.length > 0) {
    nestedComments = comment.children.map(comment => {
      return comment && <Comment key={comment._id} comment={comment} />;
    });
  }

  const handleReplyAction = () => {
    setIsReplying(!isReplying);
    setIsEditing(false);
  };

  const handleEditAction = () => {
    setIsReplying(false);
    setIsEditing(!isEditing);
  };

  const hideAllAction = () => {
    setIsReplying(false);
    setIsEditing(false);
  };

  const deleteHandler = () => {
    deleteComment(comment._id)
      .then(res => {
        message.success("Comment Deleted");
      })
      .catch(error => {
        message.error("Unable to delete comment");
        console.log(error);
      });
  };

  return (
    <div className="comments-container">
      <div className="comment" key={comment._id} id={comment._id}>
        <div className="d-flex w-100">
          <div className="comment__user">
            <img src={comment.author.photoUrl} alt={comment.author.firstName} />
          </div>
          <div className="comment__container">
            <div className="d-flex align-center">
              <Link to={`/user/${comment.author._id}`}>
                <h4>{`${comment.author.firstName} ${comment.author.lastName}`}</h4>
              </Link>
              <p className="comment__timestamp">{timestamp}</p>
            </div>

            <p className="body">{comment.body}</p>
          </div>
        </div>
        {/* ==== actions-triggers ====*/}
        <div className="comment__action-triggers">
          <div className="action reply" onClick={handleReplyAction}>
            <CommentOutlined />
            <span> Reply</span>
          </div>
          {comment.author._id === user._id && (
            <Fragment>
              <div className="action edit" onClick={handleEditAction}>
                <EditOutlined />
                <span> Edit</span>
              </div>
              <div className="action delete" onClick={deleteHandler}>
                <DeleteOutlined />
                <span> Delete</span>
              </div>
            </Fragment>
          )}
        </div>
        {isReplying && (
          <div className="comment__create-comment">
            <CreateComment
              parentId={comment._id}
              type={"reply"}
              onSuccess={hideAllAction}
            />
          </div>
        )}
        {isEditing && (
          <div className="comment__create-comment">
            <EditComment
              id={comment._id}
              body={comment.body}
              onSuccess={hideAllAction}
            />
          </div>
        )}
      </div>
      {comment.children.length > 0 && (
        <div className="replies">{nestedComments}</div>
      )}
      {comment.children.filter(child => child !== null).length > 0 && (
        <div className="left-border" />
      )}
    </div>
  );
};

export default Comment;
