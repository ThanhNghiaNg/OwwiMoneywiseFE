import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { PieChart } from "../Charts/PieChart";
import useHttp from "../../hooks/useHttp";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../constants";
import NoDataImage from "../UI/NoDataImage";
import LoadingSpin from "../UI/LoadingSpin";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function DashBoard() {
  const [data, setData] = useState({ Income: {}, Outcome: {} });
  const { sendRequest: getOutComeStatistic, isLoading } = useHttp();

  useEffect(() => {
    getOutComeStatistic(
      { url: `${BASE_URL}/user/dashboard/statistic/outcome` },
      (data) => {
        console.log(data);
        setData(data);
      }
    );
  }, []);

  console.log(JSON.stringify(data["Outcome"]) === "{}");

  return (
    <>
      {isLoading && <LoadingSpin />}
      {!isLoading && data && (
        <Grid container spacing={2} columns={{ xs: 12 }}>
          {/* <Grid item sm={12} xs={6}>
            <Item>
              <PieChart
                label={"Income"}
                labels={Object.keys(data["Income"])}
                data={Object.values(data["Income"])}
              />
            </Item>
          </Grid> */}
          <Grid item xs={12}>
            <Item>
              {Object.keys(data["Outcome"]).length > 0 ? (
                <PieChart
                  label={"Expense"}
                  labels={Object.keys(data["Outcome"])}
                  data={Object.values(data["Outcome"])}
                />
              ) : (
                <NoDataImage />
              )}
            </Item>
          </Grid>
        </Grid>
      )}

      {/* {!isLoading && data && (
        <Grid
          container
          spacing={2}
          columns={{ xs: 12 }}
          sx={{ marginBlock: 2 }}
        >
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
      )} */}
    </>
  );
}
