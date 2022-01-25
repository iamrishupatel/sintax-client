import Comment from "./Comment";

const Comments = ({ data }) => {
  if (data.length === 0) return null;
  return data.map(
    comment =>
      comment && (
        <div className="comments" key={comment._id}>
          <Comment data={comment} level={1} />
        </div>
      )
  );
};

export default Comments;
