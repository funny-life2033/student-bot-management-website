import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Axios } from "../utils/config";

export const registerClient = createAsyncThunk(
  "registerClient",
  async ({ username, password }) => {
    try {
      await Axios.post("/studentClient/registerClient", {
        username,
        password,
      });

      return { username };
    } catch (error) {
      console.log(error.response.data.error);
      return { error: error.response.data.error };
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    isConnected: false,
    error: null,
    isLoading: false,
    clients: [],
    isGettingClients: false,
    isRegisteringClient: false,
    registeringClientError: null,
    newRegisteredClient: null,
  },
  reducers: {
    connect: (state) => {
      state.error = null;
      state.isLoading = true;
    },
    connected: (state) => {
      state.isLoading = false;
      state.isConnected = true;
    },
    connectFailed: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    disconnect: (state) => {
      state.isConnected = false;
    },
    alertedNewClient: (state) => {
      state.newRegisteredClient = null;
    },
    setClients: (state, { payload }) => {
      state.clients = payload;
    },
    setCredential: (state, { payload }) => {
      state.clients = state.clients.map((client) => {
        if (client.username === payload) {
          return { ...client, credential: payload.credential };
        } else {
          return client;
        }
      });
    },
  },
  extraReducers: {
    [registerClient.pending]: (state) => {
      state.isRegisteringClient = true;
      state.registeringClientError = null;
    },
    [registerClient.rejected]: (state) => {
      state.isRegisteringClient = false;
    },
    [registerClient.fulfilled]: (state, { payload }) => {
      state.isRegisteringClient = false;
      if (payload.error) {
        state.registeringClientError = payload.error;
      } else {
        state.newRegisteredClient = payload;
        state.clients = [...state.clients, payload];
        state.registeringClientError = null;
      }
    },
  },
});

export const {
  connect,
  connected,
  connectFailed,
  initError,
  disconnect,
  alertedNewClient,
  setClients,
  setCredential,
} = userSlice.actions;
export default userSlice.reducer;
