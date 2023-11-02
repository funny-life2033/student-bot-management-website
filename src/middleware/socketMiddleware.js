import {
  acceptSlot as studentAcceptSlot,
  acceptedSlot as studentAcceptedSlot,
  botConnected as studentBotConnected,
  botDisconnected as studentBotDisconnected,
  declineSlot as studentDeclineSlot,
  declinedSlot as studentDeclinedSlot,
  setBots as setStudentBots,
  setReservedSlots as setStudentReservedSlots,
  startedBot as startedStudentBot,
  stoppedBot as stoppedStudentBot,
  setIsWorking as studentSetIsWorking,
  newReservedSlotAlert as studentNewReservedSlotAlert,
  initStudentBots,
  errorAlert,
  setIsWorking,
} from "../store/studentSlice";
import { connected, connectFailed, setClients } from "../store/authSlice";

export default function socketMiddleware(socket) {
  return (params) => (next) => (action) => {
    const { dispatch } = params;
    const { type, payload } = action;

    switch (type) {
      case "user/connect": {
        socket.connect();

        socket.on(
          "agent connect success",
          ({ connectedStudentBots, studentClients }) => {
            console.log("agent connect success");
            socket.isConnected = true;
            dispatch(connected());
            dispatch(setStudentBots(connectedStudentBots));
            dispatch(setClients(studentClients));
          }
        );

        socket.on("agent connect failed", (err) => {
          dispatch(connectFailed(err));
        });

        socket.on("student bot connect", (username) => {
          dispatch(studentBotConnected(username));
        });

        socket.on("student bot disconnect", (username) => {
          console.log("student bot disconnect ", username);
          dispatch(studentBotDisconnected(username));
        });

        socket.on("student bot started", ({ username }) => {
          dispatch(startedStudentBot(username));
        });

        socket.on("student bot stopped", ({ username }) => {
          dispatch(stoppedStudentBot(username));
        });

        socket.on("student accepted slot", ({ username }) => {
          dispatch(studentAcceptedSlot(username));
        });

        socket.on("student declined slot", ({ username }) => {
          dispatch(studentDeclinedSlot(username));
        });

        socket.on("student accept slot", (slot) => {
          console.log("student accept slot");
          dispatch(studentAcceptSlot({ slot }));
        });

        socket.on("student decline slot", (slot) => {
          dispatch(studentDeclineSlot({ slot }));
        });

        socket.on(
          "student bot reserved slots",
          ({ username, isWorking, reservedSlots }) => {
            dispatch(studentSetIsWorking({ username, isWorking }));
            dispatch(setStudentReservedSlots({ username, reservedSlots }));
          }
        );

        socket.on("student reserved new slot", (data) => {
          dispatch(setStudentReservedSlots(data));
        });

        socket.on("error alert", ({ error }) => {
          console.log("error alert", error);
          dispatch(errorAlert(error));
        });

        socket.on("alert", ({ username, text, slots }) => {
          dispatch(studentNewReservedSlotAlert({ username, text }));
        });

        socket.on("isWorking", ({ isWorking, username }) => {
          dispatch(setIsWorking({ isWorking, username }));
        });

        break;
      }
      case "user/disconnect": {
        socket.disconnect();
        dispatch(initStudentBots());
        break;
      }
      case "student/startBot": {
        console.log("student/startBot: ", payload);
        socket.emit("message", "student bot start", { to: payload });
        break;
      }
      case "student/stopBot": {
        socket.emit("message", "student bot stop", { to: payload });
        break;
      }
      case "student/acceptSlot": {
        // console.log({
        //   to: payload.username,
        //   ...payload.slot,
        // });
        socket.emit("message", "student accept slot", {
          to: payload.slot.username,
          ...payload.slot,
        });
        break;
      }
      case "student/declineSlot": {
        socket.emit("message", "student decline slot", {
          to: payload.slot.username,
          ...payload.slot,
        });

        // dispatch(studentDeclinedSlot(payload.slot.username));
        break;
      }
      default: {
        break;
      }
    }

    return next(action);
  };
}