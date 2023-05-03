import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { PieChart } from "../Charts/PieChart";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function DashBoard() {
  const label = "Expense";
  const labels = ["Open", "High", "Low", "Close"];
  const data = [1, 2, 3, 4];
  return (
    <>
      <Grid container spacing={2} columns={{ xs: 12 }}>
        <Grid item sm={12} xs={6}>
          <Item>
            <PieChart label={label} labels={labels} data={data} />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <PieChart label={label} labels={labels} data={data} />
          </Item>
        </Grid>
      </Grid>
      <Grid container spacing={2} columns={{ xs: 12 }} sx={{ marginBlock: 2 }}>
        <Grid item sm={12} xs={6}>
          <Item>
            <PieChart label={label} labels={labels} data={data} />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <PieChart label={label} labels={labels} data={data} />
          </Item>
        </Grid>
      </Grid>
    </>
  );
}
