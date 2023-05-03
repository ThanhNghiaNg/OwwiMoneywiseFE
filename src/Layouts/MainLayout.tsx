import { ReactNode } from "react";
import Header from "../components/Header/Header";
import { Box } from "@mui/material";

type Props = { children: ReactNode };

export default function MainLayout(props: Props) {
  return (
    <div>
      <Header />
      <Box sx={{ width: "100vw", padding: 3, marginTop: 3 }}>{props.children}</Box>
    </div>
  );
}
