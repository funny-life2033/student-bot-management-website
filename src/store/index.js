import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import SocketClient from "../utils/socketClient";
import authSlice from "./authSlice";
import studentSlice from "./studentSlice";
import socketMiddleware from "../middleware/socketMiddleware";

const socket = new SocketClient();

export const store = configureStore({
  reducer: {
    user: authSlice,
    student: studentSlice,
  },
  middleware: [socketMiddleware(socket), ...getDefaultMiddleware()],
});
