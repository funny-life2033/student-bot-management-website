import { NavigateNext } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { blue, yellow } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { startBot, stopBot } from "../../store/studentSlice";

const theme = createTheme({
  palette: {
    primary: {
      main: yellow[700],
    },
    no: {
      main: yellow[900],
    },
    normal: {
      main: blue[900],
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 100,
          width: "100%",
        },
      },
      defaultProps: {
        variant: "outlined",
        endIcon: <NavigateNext />,
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          border: "none",
          boxShadow: "none",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "rgb(66, 66, 66)",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          border: "none",
        },
      },
    },
  },
});

const Dashboard = () => {
  const dispatch = useDispatch();

  const adiBots = useSelector((state) => state.adi.bots);
  const { clients, isGettingClients } = useSelector((state) => state.user);

  return (
    <ThemeProvider theme={theme}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Button>Account</Button>
              </TableCell>
              <TableCell>
                <Button>Reserved</Button>
              </TableCell>
              <TableCell>
                <Button>Status</Button>
              </TableCell>
              <TableCell>
                <Button>Start/Stop</Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isGettingClients ? (
              <CircularProgress />
            ) : (
              clients.map((client) => (
                <TableRow key={client.username}>
                  <TableCell>
                    <Button>{client.username}</Button>
                  </TableCell>
                  <TableCell>
                    <Button>
                      {adiBots[client.username]?.reservedSlots.length || 0}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      color={adiBots[client.username] ? "primary" : "error"}
                    >
                      {adiBots[client.username] ? "active" : "inactive"}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      color="success"
                      onClick={() => {
                        if (
                          adiBots[client.username] &&
                          !adiBots[client.username].isStarting &&
                          !adiBots[client.username].isStopping
                        ) {
                          if (adiBots[client.username].isWorking) {
                            dispatch(stopBot(client.username));
                          } else {
                            dispatch(startBot(client.username));
                          }
                        }
                      }}
                    >
                      {adiBots[client.username]
                        ? adiBots[client.username].isStarting
                          ? "Starting..."
                          : adiBots[client.username].isStopping
                          ? "Stopping..."
                          : adiBots[client.username].isWorking
                          ? "Stop"
                          : "Start"
                        : "Start"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
};

export default Dashboard;
