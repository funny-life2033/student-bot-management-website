import { io } from "socket.io-client";
import { WEB_SOCKET_HOST } from "./config";

export default class SocketClient {
  socket;
  isConnected = false;

  connect() {
    console.log("start connecting..");

    try {
      this.socket = io(WEB_SOCKET_HOST, {
        transports: ["websocket"],
      });

      this.socket.on("error", (e) => {
        console.log("error: ", e);
      });

      this.socket.on("connect_error", (e) => {
        console.log("connect_error: ", e);
      });

      this.socket.on("disconnect", (e) => {
        console.log("disconnected: ", e);
        if (!this.isConnected) this.socket = null;
      });

      this.socket.on("connect", () => {
        console.log("connected");
        this.socket.emit("agent connect");
      });
    } catch (error) {
      console.log(error);
    }
  }

  disconnect() {
    if (this.socket) {
      this.isConnected = false;
      this.socket.disconnect();
      this.socket = null;
    }
  }

  emit(eventName, data) {
    if (this.socket) {
      this.socket.emit(eventName, data);
    }
  }

  on(eventName, func) {
    if (this.socket) {
      this.socket.on(eventName, func);
    }
  }
}
