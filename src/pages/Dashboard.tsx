import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DashBoard from "../components/Dashboard/DashBoard";
import useHttp from "../hooks/useHttp";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

function Dashboard() {
  const [data, setData] = useState({ Income: {}, Outcome: {} });
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const { sendRequest: getOutComeStatistic, isLoading } = useHttp();
  useEffect(() => {
    getOutComeStatistic(
      { url: `${BASE_URL}/user/dashboard/statistic/outcome?month=${month}` },
      (data) => {
        setData(data);
      }
    );
  }, [month]);
  const months = Array.from({ length: 12 }, (v, k) => {
    v;
    return k;
  });
  return (
    <div>
      <Box
        sx={{
          flexGrow: 1,
          marginTop: 10,
          paddingInline: { xs: 1, mb: 2, sm: 5, lg: 25 },
        }}
      >
        <div className="flex sm:justify-end">
          <div className="mr-4 w-52">
            <FormControl fullWidth>
              <InputLabel id="month">Select Month</InputLabel>
              <Select
                labelId="month"
                id="month"
                value={String(month)}
                label="Select Month"
                onChange={(event: SelectChangeEvent) => {
                  setMonth(Number(event.target.value));
                }}
              >
                {months.map((type: number) => {
                  return <MenuItem value={type}>{type + 1}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </div>
        </div>
        <Grid
          container
          xs={12}
          sx={{ marginBlockEnd: 1, marginTop: 2 }}
          spacing={2}
        >
          <Grid container xs={12}>
            <DashBoard data={data} isLoading={isLoading} />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Dashboard;
