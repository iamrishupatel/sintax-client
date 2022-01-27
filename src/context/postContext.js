import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./userContext";
import feathersClient from "../feathers";
import axios from "axios";
import { API } from "../backend";

export const PostContext = React.createContext();

const PostContextProvider = props => {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isPostLoading, setIsPostLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    setIsPostLoading(true);
    getAllPosts({
      $sort: { createdAt: -1 },
    })
      .then(res => {
        mounted && setPosts(() => [...new Set(res.data)]);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setIsPostLoading(false);
      });

    return () => (mounted = false);
  }, []);

  useEffect(() => {
    let mounted = true;
    if (user && user._id) {
      const postService = feathersClient.service("posts");
      postService.on(
        "created",
        newPost =>
          mounted &&
          setPosts(prevPosts => [...new Set([newPost, ...prevPosts])])
      );

      postService.on("patched", newPost => {
        mounted &&
          setPosts(prevPosts =>
            prevPosts.map(post => {
              if (post._id !== newPost._id) return post;
              return newPost;
            })
          );
      });

      postService.on("removed", post => {
        mounted &&
          setPosts(prevPosts =>
            prevPosts.filter(item => item._id !== post._id)
          );
      });
    }
    return () => (mounted = false);
  }, [user]);

  // TODO: move these calls to servercalls/post.js
  const getAllPosts = async query => {
    try {
      const result = await feathersClient
        .service("posts")
        .find({ query: query });
      if (result.skip >= result.total) setHasMore(false);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };

  const getPostById = async id => {
    try {
      return await feathersClient.service("posts").get(id);
    } catch (error) {
      throw new Error(error);
    }
  };
  const createNewPost = async formData => {
    const token = localStorage.getItem("sintax-jwt");
    return axios({
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      url: `${API}/posts`,
      data: formData,
    })
      .then(res => res)
      .catch(error => {
        throw new Error(error);
      });
  };
  const updatePost = async (postId, data) => {
    try {
      return await feathersClient.service("posts").patch(postId, data);
    } catch (error) {
      throw new Error(error);
    }
  };

  const deletePost = async id => {
    try {
      const result = await feathersClient.service("posts").remove(id);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const createComment = async data => {
    try {
      return await feathersClient.service("comments").create(data);
    } catch (error) {
      throw new Error(error);
    }
  };
  const updateComment = async (id, data) => {
    try {
      return await feathersClient.service("comments").patch(id, data);
    } catch (error) {
      throw new Error(error);
    }
  };

  const deleteComment = async id => {
    try {
      const result = await feathersClient.service("comments").remove(id);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        isPostLoading,
        setPosts,
        getAllPosts,
        hasMore,
        setHasMore,
        getPostById,
        createComment,
        deleteComment,
        createNewPost,
        deletePost,
        updatePost,
        updateComment,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
