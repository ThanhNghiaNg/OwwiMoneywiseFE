import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DashBoard from "../components/Dashboard/DashBoard";


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
