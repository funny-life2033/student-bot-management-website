import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bots: {},
  newSlots: [],
  error: null,
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    initStudentBots: (state) => {
      state.bots = {};
      state.newSlots = [];
    },
    setIsWorking: (state, { payload }) => {
      if (state.bots[payload.username])
        state.bots[payload.username].isWorking = payload.isWorking;
    },
    startBot: (state, { payload }) => {
      if (state.bots[payload]) state.bots[payload].isStarting = true;
    },
    stopBot: (state, { payload }) => {
      if (state.bots[payload]) state.bots[payload].isStopping = true;
    },
    startedBot: (state, { payload }) => {
      if (state.bots[payload]) {
        state.bots[payload].isWorking = true;
        state.bots[payload].isStarting = false;
      }
    },
    stoppedBot: (state, { payload }) => {
      if (state.bots[payload]) {
        state.bots[payload].isWorking = false;
        state.bots[payload].isStopping = false;
      }
    },
    setBots: (state, { payload }) => {
      for (let username of payload) {
        state.bots[username] = { availableSlots: [] };
      }
    },
    setAvailableSlots: (state, { payload }) => {
      const { username, availableSlots } = payload;
      if (state.bots[username]) {
        state.bots[username].availableSlots = availableSlots;
      }
    },
    alertedNewSlot: (state) => {
      state.newSlots = [];
    },
    newAvailableSlotAlert: (state, { payload }) => {
      state.newSlots = payload;
    },
    botConnected: (state, { payload }) => {
      state.bots[payload.username] = {
        availableSlots: [],
        credential: payload.credential,
      };
    },
    botDisconnected: (state, { payload }) => {
      delete state.bots[payload];
    },
    acceptSlot: (state, { payload }) => {
      const { username, slot } = payload;
      if (state.bots[username]) {
        state.bots[username].acceptingSlot = slot;
      }
    },
    declineSlot: (state, { payload }) => {
      const { username, slot } = payload;
      // console.log(username, slot);
      if (state.bots[username]) {
        state.bots[username].decliningSlot = slot;
      }
    },
    acceptedSlot: (state, { payload }) => {
      if (state.bots[payload]) {
        state.bots[payload].reservedSlots = state.bots[
          payload
        ].reservedSlots.filter(
          (slot) => slot !== state.bots[payload].acceptingSlot
        );
        state.bots[payload].acceptingSlot = null;
      }
    },
    declinedSlot: (state, { payload }) => {
      if (state.bots[payload]) {
        state.bots[payload].reservedSlots = state.bots[
          payload
        ].reservedSlots.filter((slot) => {
          let decliningSlot = state.bots[payload].decliningSlot;
          return (
            slot.category !== decliningSlot.category ||
            slot.testCentre !== decliningSlot.testCentre ||
            slot.slotType !== decliningSlot.slotType ||
            slot.dateTime !== decliningSlot.dateTime
          );
        });
        state.bots[payload].decliningSlot = null;
      }
    },
    errorAlert: (state, { payload }) => {
      state.error = payload;
    },
    alertedError: (state) => {
      state.error = null;
    },
  },
});

export const {
  alertedNewSlot,
  initStudentBots,
  startBot,
  startedBot,
  stopBot,
  stoppedBot,
  setBots,
  setReservedSlots,
  acceptSlot,
  declineSlot,
  acceptedSlot,
  declinedSlot,
  botConnected,
  botDisconnected,
  setIsWorking,
  newReservedSlotAlert,
  errorAlert,
  alertedError,
} = studentSlice.actions;
export default studentSlice.reducer;
