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
  const [month, setMonth] = useState(new Date().getMonth());
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

  return (
    <>
      {isLoading && <LoadingSpin />}
      {!isLoading && data && (
        <Grid container spacing={2} columns={{ xs: 12 }}>
          <Grid item md={12} xs={6}>
            <Item>
              {Object.keys(data["Income"]).length > 0 ? (
                <PieChart
                  label={"Income"}
                  labels={Object.keys(data["Income"])}
                  data={Object.values(data["Income"])}
                />
              ) : (
                <>
                  <NoDataImage />
                  <p className="text-lg mt-5">
                    There is no data, create Transactions first!
                  </p>
                </>
              )}
            </Item>
          </Grid>
          <Grid item md={12} xs={6}>
            <Item>
              {Object.keys(data["Outcome"]).length > 0 ? (
                <PieChart
                  label={"Expense"}
                  labels={Object.keys(data["Outcome"])}
                  data={Object.values(data["Outcome"])}
                />
              ) : (
                <>
                  <NoDataImage />
                  <p className="text-lg mt-5">
                    There is no data, create Transactions first!
                  </p>
                </>
              )}
            </Item>
            {/* <div>
              <h2>
                {dotStyleCurrency(
                  Object.values(data["Outcome"]).reduce((acc, v) => acc + v, 0)
                )}
              </h2>
            </div> */}
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
