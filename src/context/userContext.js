import { useState, useEffect, createContext } from "react";
import feathersClient from "../feathers";
import { notification } from "antd";

export const UserContext = createContext();

const UserContextProvider = props => {
  const [user, setUser] = useState();


  useEffect(() => {
    feathersClient
      .reAuthenticate()
      .then(result => {
        setUser(result.user);
      })
      .catch(error => {
        console.log("Error in auth", error);
      });
  }, []);

  const signInWithEmailAndPassword = async credentials => {
    try {
      feathersClient.authenticate({
        strategy: "local",
        ...credentials,
      });
      const result = await feathersClient.get("authentication");
      if (result.accessToken) {
        setUser(result.user);
      }
      return result.user;
    } catch (error) {
      notification.error({
        title: "Error",
        description: error.message,
      });
      throw new Error(error);
    }
  };

  const signUpWithEmailAndPassword = async (credentials, callback) => {
    try {
      await feathersClient.service("users").create(credentials);
      signInWithEmailAndPassword(credentials);
    } catch (error) {
      const { errors } = error;
      errors.forEach(error => {
        notification.error({
          title: "Error",
          description: error.message,
        });
      });
    } finally {
      callback();
    }
  };

  const signout = () => {
    feathersClient.logout();
    setUser(null);
  };
  return (
    <UserContext.Provider
      value={{
        user,
        signInWithEmailAndPassword,
        signUpWithEmailAndPassword,
        signout,
        setUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
