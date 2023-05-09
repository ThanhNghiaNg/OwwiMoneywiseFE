import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import DashBoard from "../components/Dashboard/DashBoard";
import TransactionList from "../components/TransactionList/TransactionList";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Dashboard() {
  return (
    <Box sx={{ flexGrow: 1, marginTop: 10, paddingInline: 25 }}>
      <Grid container xs={12} sx={{ marginBlockEnd: 1 }} spacing={2}>
        <Grid container xs={12}>
          <DashBoard />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
