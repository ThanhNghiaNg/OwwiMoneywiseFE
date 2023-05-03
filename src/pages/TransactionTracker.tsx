import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import DashBoard from "../components/Dashboard/DashBoard";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function TransactionTracker() {
  return (
    <Box sx={{ flexGrow: 1, marginTop: 10}}>
      <Grid container xs={12} sx={{ marginBlockEnd: 1 }} spacing={2}>
        <Grid container xs={12} sm={8}>
          <DashBoard />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Item>Transaction List</Item>
        </Grid>
      </Grid>
    </Box>
  );
}

export default TransactionTracker;
