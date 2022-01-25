import { useState, useContext, Fragment } from "react";
import { PostContext } from "../../context/postContext";
import { LoadingOutlined } from "@ant-design/icons";
import { message } from "antd";

const EditComment = ({ body, id, onSuccess }) => {
  const { updateComment } = useContext(PostContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    status: false,
    message: "",
  });
  const [comment, setComment] = useState({
    body,
  });

  const handleChange = e => {
    setComment({ body: e.target.value });
    setError({
      status: false,
      message: "",
    });
  };

  const submitHandler = e => {
    e.preventDefault();
    if (comment.body.trim() === "") {
      setError({
        status: true,
        message: "Please write something before submiting!",
      });
      return;
    }
    setIsLoading(true);
    updateComment(id, comment)
      .then(() => message.success("Comment edited."))
      .catch(error => {
        setError({
          status: true,
          message: error.message,
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
          maxLength="256"
          className="scroll-y"
        />
        {error.status && <p className="error-text">{error.message}</p>}
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

export default EditComment;
