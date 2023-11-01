import { Paper, Step, StepLabel, Stepper, Typography } from "@mui/material";

const steps = [
  `ADD NEW BOTS HERE`,
  "ADD NEW CLIENT ACCOUNTS",
  `LOAD ALL BOTS IN 1 DASHBOARD`,
  `ACCESS ALL BOTS HISTORY IN 1 DASHBOARD`,
];

const Home = () => {
  return (
    <Stepper
      activeStep={4}
      orientation="vertical"
      sx={{ maxWidth: 700, mt: 10, ml: "auto", mr: "auto" }}
    >
      {steps.map((step) => (
        <Step key={step}>
          <StepLabel sx={{ minHeight: 150 }}>
            <Paper
              elevation={5}
              sx={{
                minHeight: 100,
                padding: 2,

                alignItems: "center",
                display: "flex",
              }}
            >
              <Typography sx={{ fontSize: 25 }}>{step}</Typography>
            </Paper>
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default Home;
