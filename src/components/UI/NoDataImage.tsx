import { Box } from "@mui/material";
import image from "../../assets/images/nodata.jpg";

export default function NoDataImage() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <img src={image} style={{ maxWidth: "20rem" }}></img>
    </Box>
  );
}
