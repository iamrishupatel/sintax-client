import feathers from "@feathersjs/client";
import socketio from "@feathersjs/socketio-client";
import io from "socket.io-client";
import { API } from "./backend";

const socket = io(API);
const feathersClient = feathers();

feathersClient.configure(socketio(socket));
feathersClient.configure(
  feathers.authentication({
    storage: window.localStorage,
    storageKey: "sintax-jwt",
  })
);

export default feathersClient;
