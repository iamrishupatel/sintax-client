import feathersClient from "../feathers";
import axios from "axios";
import { API } from "../backend";

export const getUserById = async (userId, query) => {
  return feathersClient
    .service("users")
    .get(userId, {
      query: query,
    })
    .then(user => user)
    .catch(error => {
      console.log("error in finding user");
      throw new Error(error);
    });
};

export const updateUser = async (userId, data) => {
  const token = localStorage.getItem("sintax-jwt");
  try {
    const result = await axios({
      method: "PATCH",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: `${API}/users/${userId}`,
      data: data,
    });
    return result.data;
  } catch (error) {
    throw new Error("Failed to update user info");
  }
};

export const getAllUsers = async queries => {
  return feathersClient
    .service("users")
    .find({
      query: queries,
    })
    .then(result => result.data)
    .catch(error => {
      console.log("error in finding user");
      return error;
    });
};
