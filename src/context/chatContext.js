import { useState, useEffect } from "react";
import { createContext } from "react";
import feathersClient from "../feathers";

export const ChatContext = createContext();

const ChatContextProvider = props => {
  const [communities, setCommunities] = useState([]);

  const [selectedCommunity, setSelectedCommunity] = useState(() =>
    localStorage.getItem("selected-community")
      ? JSON.parse(localStorage.getItem("selected-community"))
      : {}
  );
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    let mounted = true;
    feathersClient
      .service("communities")
      .find({
        query: {
          $select: ["name", "photoUrl", "description"],
        },
      })
      .then(res => {
        if (mounted) setCommunities(res.data);
      })
      .catch(error => {
        console.log(error);
      });
    return () => (mounted = false);
  }, []);

  // listen to patch events on community
  useEffect(() => {
    let mounted = true;
    const communityService = feathersClient.service("communities");
    const onPatchedListener = community => {
      if (mounted && selectedCommunity._id === community._id) {
        setSelectedCommunity(community);
      }
    };

    communityService.on("patched", onPatchedListener);

    return () => {
      mounted = false;
      communityService.removeListener("patched", onPatchedListener);
    };
  }, [selectedCommunity._id]);

  // get all messges for a selected community
  useEffect(() => {
    let mounted = true;
    feathersClient
      .service("communities")
      .get(selectedCommunity._id, {
        query: {
          $select: ["messages"],
          $populate: {
            path: "messages.author",
            select: "photoUrl firstName lastName",
          },
        },
      })
      .then(res => {
        const sortedMessages = res.messages.sort((firstItem, secondItem) => {
          if (firstItem.createdAt > secondItem.createdAt) return -1;
          if (firstItem.createdAt < secondItem.createdAt) return 1;
          return 0;
        });
        mounted && setMessages(sortedMessages);
      })
      .catch(error => {
        console.log(error);
      });

    return () => (mounted = false);
  }, [selectedCommunity]);

  // persist selected community into localstorage
  useEffect(() => {
    localStorage.setItem(
      "selected-community",
      JSON.stringify(selectedCommunity)
    );
  }, [selectedCommunity]);

  const sendChat = newMessage => {
    let data = {
      messages: [newMessage, ...messages],
    };
    return feathersClient
      .service("communities")
      .patch(selectedCommunity._id, data)
      .then(res => res)
      .catch(error => {
        throw new Error(error);
      });
  };

  return (
    <ChatContext.Provider
      value={{
        communities,
        selectedCommunity,
        setSelectedCommunity,
        sendChat,
        messages,
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
