import { Box, Card, CardActions, CardMedia } from "@mui/material";
import BackImage from "../../assests/home-back.png";
import { Share } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { connect } from "../../store/authSlice";

const Connect = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isConnected } = useSelector((state) => state.user);

  const connectionSubmit = () => {
    dispatch(connect());
  };

  useEffect(() => {
    if (isConnected) {
      navigate("/home");
    }
  }, [isConnected, navigate]);

  return (
    <Box
      sx={{
        position: "fixed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <Card
        sx={{
          maxWidth: "600px",
          marginX: "10px",
        }}
      >
        <CardMedia component={"img"} image={BackImage} />
        <CardActions>
          <LoadingButton
            sx={{ width: "100%", textTransform: "none" }}
            variant="contained"
            color="success"
            startIcon={<Share />}
            loading={isLoading}
            onClick={connectionSubmit}
          >
            Connect
          </LoadingButton>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Connect;
