import { Box } from "@mui/material";
import image from "../../assets/images/nodata.jpg";

export default function NoDataImage({className}: {className?: string}) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }} className={className}>
      <img src={image} className="w-full h-full"></img>
    </Box>
  );
}
