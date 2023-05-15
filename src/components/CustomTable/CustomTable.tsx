import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";

type Props = {
  columns: string[];
  rows: {
    type: string;
    value: string;
    // format?: string;
    // color?: string;
    // borderColor?: string;
  }[][];
  handleEdit: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleDelete: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function CustomTable(props: Props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { columns, rows, handleEdit, handleDelete } = props;

  const handleChangePage = (event: unknown, newPage: number) => {
    event;
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", marginTop: 5 }}>
      <TableContainer sx={{ maxHeight: 1000 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column} align={"center"}>
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, i) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={`table-row-${i}`}
                  >
                    {row.map((item, vi) => {
                      if (item.type === "text")
                        return (
                          <TableCell
                            key={`table-cell-${i}-${vi}`}
                            align="center"
                          >
                            {item.value}
                          </TableCell>
                        );
                      else if (item.type === "actions") {
                        return (
                          <TableCell
                            key={`table-cell-${i}-${vi}`}
                            align="center"
                          >
                            <Button onClick={handleEdit}>
                              <input type="text" value={row[0].value} hidden />
                              <ModeEditOutlineIcon />
                            </Button>
                            <Button color="error" onClick={handleDelete}>
                              <input type="text" value={row[0].value} hidden />
                              <DeleteOutlineIcon />
                            </Button>
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[7, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
