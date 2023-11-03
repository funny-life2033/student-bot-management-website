import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Toolbar } from "@mui/material";
import Connect from "./pages/Connect";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AddNewAccount from "./pages/AddNewAccount";
import AIAssist from "./pages/AIAssist";
import History from "./pages/History";
import Help from "./pages/Help";
import Header from "./layout/Header";
import { useEffect } from "react";
import addNotification from "react-push-notification";
import { useDispatch } from "react-redux";
import { alertedError, alertedNewSlot } from "./store/studentSlice";

function App() {
  const dispatch = useDispatch();
  const { newSlot, error } = useSelector((state) => state.student);

  useEffect(() => {
    if (newSlot) {
      addNotification({
        title: "New slot is reserved",
        native: true,
      });

      dispatch(alertedNewSlot());
    }
  }, [newSlot, dispatch]);

  useEffect(() => {
    if (error) {
      addNotification({
        title: error,
        theme: "red",
        native: true,
      });

      dispatch(alertedError());
    }
  }, [error, dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="connect" element={<Connect />} />

        <Route
          path="*"
          element={
            <Box sx={{ display: "flex" }}>
              <Header />
              <Box component="main" sx={{ p: 3, width: "100%" }}>
                <Toolbar />
                <Routes>
                  <Route path="home" element={<Home />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="add-new-account" element={<AddNewAccount />} />
                  <Route path="ai-assist" element={<AIAssist />} />
                  <Route path="history" element={<History />} />
                  <Route path="help" element={<Help />} />
                  <Route path="*" element={<Navigate to={"connect"} />} />
                </Routes>
              </Box>
            </Box>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
