import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { PostContext } from "../../context/postContext";
import useDocumentTitle from "../../hooks/useDocumentTitle";

// components
import Post from "../../components/post/Post";
import Comment from "../../components/comments/Comment";
import PostSkeleton from "../../components/post/PostSkeleton";
import CreateComment from "../../components/comments/CreateComment";
import feathersClient from "../../feathers";

const PostPage = () => {
  useDocumentTitle("Post | Sintax")
  let { postId } = useParams();
  const { getPostById } = useContext(PostContext);

  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    getPostById(postId)
      .then(res => {
        res.comments = res.comments
          .filter(comment => comment !== null)
          .sort((a, b) => {
            if (a.createdAt > b.createdAt) return -1;
            if (a.createdAt < b.createdAt) return 1;
            return 0;
          });
        if (isMounted) {
          setPost(res);
        }
      })
      .catch(error => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
    return () => (isMounted = false);
  }, [postId, getPostById]);

  useEffect(() => {
    let isMounted = true;
    const commentService = feathersClient.service("comments");
    commentService.on("removed", res => {
      if (isMounted && res.type === "comment") {
        setPost(prevPost => ({
          ...prevPost,
          comments: prevPost.comments.filter(
            comment => comment._id !== res._id
          ),
        }));
      }
    });
    commentService.on("patched", res => {
      if (isMounted && res.type === "comment") {
        setPost(prevPost => ({
          ...prevPost,
          comments: prevPost.comments.map(comment => {
            if (comment._id === res._id) {
              comment.body = res.body;
            }
            return comment;
          }),
        }));
      }
    });
    return () => (isMounted = false);
  });

  if (isLoading) {
    return <PostSkeleton />;
  }

  if (error) {
    return <div>ERROR IN FETCHING POST</div>;
  }
  
  if (post._id) {
    return (
      <div>
        <Post post={post} ref={null} />
        <div className="post-page__create-comment">
          <h4>Add Comment</h4>
          <CreateComment parentId={post._id} type={"comment"} />
        </div>

        {post.comments &&
          post.comments.length > 0 &&
          post.comments.map(
            comment =>
              comment && (
                <div className="comments" key={comment._id}>
                  <Comment comment={comment} />
                </div>
              )
          )}
      </div>
    );
  }
  return null;
};

export default PostPage;
