import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import SocketClient from "../utils/socketClient";
import authSlice from "./authSlice";
import adiSlice from "./adiSlice";
import socketMiddleware from "../middleware/socketMiddleware";

const socket = new SocketClient();

export const store = configureStore({
  reducer: {
    user: authSlice,
    adi: adiSlice,
  },
  middleware: [socketMiddleware(socket), ...getDefaultMiddleware()],
});
