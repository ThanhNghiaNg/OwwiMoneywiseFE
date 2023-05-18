import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
export type Props = {
  paddingBlock?: string;
  size?: string | number;
};
export default function LoadingSpin(props: Props) {
  const { paddingBlock } = props;
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        paddingBlock: paddingBlock ? paddingBlock : "3rem",
        width: "100%",
        // size: size ? size : 40,
      }}
    >
      <CircularProgress />
    </Box>
  );
}
