import { Box } from "@mui/material";
import image from "../../assets/images/nodata.jpg";

export default function NoDataImage() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <img src={image} style={{ width: "100%", height: "100%" }}></img>
    </Box>
  );
}
