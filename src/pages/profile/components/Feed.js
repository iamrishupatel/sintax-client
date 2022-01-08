import feathersClient from "../../../feathers";
import { useEffect, useState, useContext } from "react";
import Post from "../../../components/post/Post";
import { ProfileContext } from "../Profile";
import About from "./About.js";

const Feed = () => {
  const { fetchedUser } = useContext(ProfileContext);
  const { posts } = fetchedUser;

  const sortedPost = posts.sort((a, b) => {
    if (a.createdAt > b.createdAt) return -1;
    if (a.createdAt < b.createdAt) return 1;
    return 0;
  });

  const [fetchedUserPosts, setFetchedUserPosts] = useState(() =>
    sortedPost.map(post => ({
      ...post,
      author: {
        _id: fetchedUser._id,
        firstName: fetchedUser.firstName,
        lastName: fetchedUser.lastName,
        photoUrl: fetchedUser.photoUrl,
      },
    }))
  );

  useEffect(() => {
    let mounted = true;
    const onCreatedListener = post => {
      if (fetchedUser._id === post.author._id) {
        setFetchedUserPosts(prevPosts => [post, ...prevPosts]);
      }
    };
    const onRemovedListener = post => {
      if (fetchedUser._id === post.author._id) {
        setFetchedUserPosts(prevPosts =>
          prevPosts.filter(item => item._id !== post._id)
        );
      }
    };
    const onUpdatedListener = newPost => {
      if (fetchedUser._id === newPost.author._id)
        setFetchedUserPosts(prevPosts =>
          prevPosts.map(post => {
            if (post._id !== newPost._id) return post;
            post.likes = newPost.likes;
            return post;
          })
        );
    };

    const feedService = feathersClient.service("posts");
    if (!mounted) return;
    feedService.on("created", onCreatedListener);
    feedService.on("removed", onRemovedListener);
    feedService.on("patched", onUpdatedListener);

    return () => {
      mounted = false;
      feedService.removeListener("created", onCreatedListener);
      feedService.removeListener("removed", onRemovedListener);
      feedService.removeListener("patched", onUpdatedListener);
    };
  }, [fetchedUser._id]);

  return (
    <div className="profile-feed d-flex">
      <div className="feed__about">
        <About />
      </div>
      <div className="feed__posts">
        {fetchedUserPosts.length > 0 ? (
          fetchedUserPosts.map(post => <Post key={post._id} post={post} />)
        ) : (
          <h2 className="empty-posts">No Posts Found</h2>
        )}
      </div>
      <div className="right-space"></div>
    </div>
  );
};

export default Feed;
