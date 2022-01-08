import { LoadingOutlined } from "@ant-design/icons";
import { message } from "antd";
import { useContext, Fragment, useState, useRef, useCallback } from "react";
import Post from "../../../components/post/Post";
import PostSkeleton from "../../../components/post/PostSkeleton";
import { PostContext } from "../../../context/postContext";

const Feed = () => {
  const { posts, isPostLoading, setPosts, getAllPosts, hasMore, setHasMore } =
    useContext(PostContext);
  const [skip, setSkip] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: " 1rem 0",
  };

  const observer = useRef();
  const lastPostRef = useCallback(
    node => {
      if (isLoading || isPostLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          let query = {
            $sort: { createdAt: -1 },
            $skip: skip,
          };
          setIsLoading(true);
          getAllPosts(query)
            .then(res => {
              if (res.data.length > 0) {
                setPosts(prevPosts => {
                  return [...new Set([...prevPosts, ...res.data])];
                });
                setSkip(prevState => prevState + 10);
              }
              if (res.skip >= res.total) {
                setHasMore(false);
              }
            })
            .catch(error => {
              message.error("Failed to load more posts");
            })
            .finally(() => {
              setIsLoading(false);
            });
        }
      });
      if (node) observer.current.observe(node);
    },
    [getAllPosts, hasMore, isLoading, isPostLoading, setHasMore, setPosts, skip]
  );

  if (isPostLoading) {
    return (
      <Fragment>
        <PostSkeleton />
        <PostSkeleton />
      </Fragment>
    );
  }
  return (
    <Fragment>
      {posts.length > 0 ? (
        posts.map((post, index) => {
          if (posts.length === index + 1) {
            return <Post ref={lastPostRef} key={post._id} post={post} />;
          }
          return <Post key={post._id} post={post} />;
        })
      ) : (
        <h1 className="empty-posts">No Posts Found</h1>
      )}
      {isLoading && (
        <div style={style}>
          <LoadingOutlined style={{ fontSize: "2rem" }} />
        </div>
      )}
      {posts.length > 0 && !hasMore && (
        <div className="d-flex-center" style={style}>
          <h4>You Have Reached the end.</h4>
        </div>
      )}
    </Fragment>
  );
};

export default Feed;


