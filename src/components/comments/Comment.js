import {
  Fragment,
  useState,
  useContext,
  createContext,
  useEffect,
} from "react";
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
import feathersClient from "../../feathers";


const CommentContext = createContext();

/*
 use level to make sure that 
 comments do not get nested too deep
*/

export default function Comment({ data, level }) {
  const [comment, setComment] = useState(data);
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const timestamp =
    comment.createdAt && format(new Date(comment.createdAt), "PPp");

  let nestedComments;
  if (comment.children.length > 0) {
    nestedComments = comment.children.map(comment => {
      return (
        comment && (
          <Comment key={comment._id} data={comment} level={level + 1} />
        )
      );
    });
  }

  useEffect(() => {
    let mounted = true;
    const commentService = feathersClient.service("comments");
    const onCreatedListener = res => {
      if (!mounted) return;
      if (res.parentId === comment._id) {
        setComment(prevState => ({
          ...prevState,
          children: [...new Set([res, ...prevState.children])],
        }));
      }
    };
    const onPatchedListener = res => {
      if (mounted && res._id === comment._id) {
        setComment(prevState => ({
          ...prevState,
          body: res.body,
        }));
      }
    };
    const onRemovedListener = res => {
      if (mounted && res.parentId === comment._id) {
        setComment(prevState => ({
          ...prevState,
          children: prevState.children.filter(child => child._id !== res._id),
        }));
      }
    };

    commentService.on("created", onCreatedListener);
    commentService.on("patched", onPatchedListener);
    commentService.on("removed", onRemovedListener);
    return () => {
      mounted = false;
      commentService.removeListener("created", onCreatedListener);
      commentService.removeListener("removed", onRemovedListener);
      commentService.removeListener("patched", onPatchedListener);
    };
  }, [comment._id]);

  return (
    <CommentContext.Provider
      value={{
        comment,
        level,
        isReplying,
        isEditing,
        setIsReplying,
        setIsEditing,
      }}
    >
      <div className="comments-container">
        {/* ---------- comment ---------- */}
        <div className="comment" key={comment._id} id={comment._id}>
          <div className="d-flex w-100">
            <div className="comment__user">
              <img
                src={comment.author.photoUrl}
                alt={comment.author.firstName}
              />
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
        </div>
        {/* ---------- ACTIONS ---------- */}
        <Actions />
        {comment.children.length > 0 && (
          <div className="replies">{nestedComments}</div>
        )}
        {comment.children.filter(child => child !== null).length > 0 && (
          <div className="left-border" />
        )}
      </div>
    </CommentContext.Provider>
  );
}

const Actions = () => {
  const { comment, isReplying, setIsReplying, isEditing, setIsEditing } =
    useContext(CommentContext);

  const hideAllAction = () => {
    setIsReplying(false);
    setIsEditing(false);
  };

  return (
    <Fragment>
      <ActionTriggers />
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
    </Fragment>
  );
};

const ActionTriggers = () => {
  const { comment, isReplying, setIsReplying, isEditing, setIsEditing, level } =
    useContext(CommentContext);
  const { deleteComment } = useContext(PostContext);
  const { user } = useContext(UserContext);

  const handleReplyAction = () => {
    setIsReplying(!isReplying);
    setIsEditing(false);
  };

  const handleEditAction = () => {
    setIsReplying(false);
    setIsEditing(!isEditing);
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
    <div className="comment__action-triggers">
      {level < 4 && (
        <div title="Reply" onClick={handleReplyAction} className="action reply">
          <CommentOutlined />
          <span> Reply</span>
        </div>
      )}
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
  );
};
