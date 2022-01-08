import { useState, useEffect, createContext } from "react";
import { Result, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import useScrollTop from "../../hooks/useScrollTop.js";
import useDocumentTitle from "../../hooks/useDocumentTitle.js";

import ProfileHeader from "./components/ProfileHeader.js";
import Feed from "./components/Feed.js";

import { getUserById } from "../../servercalls/user";

export const ProfileContext = createContext();

const ProfilePage = () => {
  useScrollTop();
  const { userId } = useParams();

  const [fetchedUser, setFetchedUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    getUserById(userId, {
      $populate: "posts",
    })
      .then(user => {
        if (isMounted) {
          setFetchedUser(user);
        }
      })
      .catch(error => {
        setError(true);
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
    return () => (isMounted = false);
  }, [userId, setFetchedUser]);

  const pageTitle = fetchedUser._id
    ? ` ${fetchedUser.firstName.replace(/^\w/, char => char.toUpperCase())}
      ${fetchedUser.lastName.replace(/^\w/, char => char.toUpperCase())}
    `
    : "Profile";

  useDocumentTitle(`${pageTitle} | Sintax`);
  if (error) {
    return (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary">
            <Link to="/">Back Home</Link>
          </Button>
        }
      />
    );
  }
  if (isLoading) {
    return (
      <div className="d-flex-center" style={{ width: "100%", height: "80vh" }}>
        <LoadingOutlined style={{ fontSize: "3.4rem" }} />
      </div>
    );
  }

  return (
    <ProfileContext.Provider value={{ fetchedUser, setFetchedUser }}>
      <div className="profile">
        <ProfileHeader />
        <Feed />
      </div>
    </ProfileContext.Provider>
  );
};

export default ProfilePage;
