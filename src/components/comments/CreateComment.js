import { useState, useContext, Fragment } from "react";
import { PostContext } from "../../context/postContext";
import { LoadingOutlined } from "@ant-design/icons";
import { message as antMessage } from "antd";

const CreateComment = ({ type, parentId, onSuccess }) => {
  const { createComment } = useContext(PostContext);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({
    status: false,
    className: "",
    body: "",
  });
  const [comment, setComment] = useState({
    body: "",
    parentId,
    type,
  });

  const handleChange = e => {
    setComment(prevState => ({ ...prevState, body: e.target.value }));
    setMessage({
      status: false,
      className: "",
      body: "",
    });
  };

  const submitHandler = e => {
    e.preventDefault();
    if (comment.body.trim() === "") {
      setMessage({
        status: true,
        className: "error-text",
        body: "Please write something before submiting!",
      });

      return;
    }
    setIsLoading(true);
    createComment(comment)
      .then(() => {
        setComment(prevState => ({ ...prevState, body: "" }));
        antMessage.success(`${type} added successfully!`);
      })
      .catch(error => {
        console.log(error);
        setMessage({
          status: true,
          className: "error-text",
          body: error.message,
        });
      })
      .finally(() => {
        setIsLoading(false);
        onSuccess();
      });
  };

  return (
    <Fragment>
      <form className="create-comment__form" onSubmit={submitHandler}>
        <textarea
          name="comment"
          value={comment.body}
          onChange={handleChange}
          placeholder="Want to say something?"
          maxLength="256"
          className="scroll-y"
        />
        {message.status && <p className={message.className}>{message.body}</p>}
        <button
          className="create-comment_btn"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <LoadingOutlined /> : "Submit"}
        </button>
      </form>
    </Fragment>
  );
};

export default CreateComment;

CreateComment.defaultProps = {
  onSuccess: () => {},
};
