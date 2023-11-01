import axios from "axios";

export const BASE_URL = "student-bot-backend.onrender.com";
// export const BASE_URL = "192.168.148.59:5000";
export const WEB_SOCKET_HOST = `wss://${BASE_URL}/`;
export const Axios = axios.create({ baseURL: `https://${BASE_URL}` });
// export const WEB_SOCKET_HOST =
//   "wss://booking-bot-management-websocket-server.onrender.com/";
