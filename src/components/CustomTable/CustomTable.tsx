import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button, Checkbox } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import NoDataImage from "../UI/NoDataImage";
import LoadingSpin from "../UI/LoadingSpin";

type Props = {
  isLoading: boolean;
  fields: { key: string; type?: string; label: string }[];
  data: any[];
  handleEdit: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleDelete: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const CustomTable = ({
  isLoading,
  fields,
  data,
  handleEdit,
  handleDelete,
}: Props): JSX.Element => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // const { isLoading, fields, data, handleEdit, handleDelete } = props;

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
              {fields.map((field) => (
                <TableCell key={field.key} align={"center"}>
                  {field.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, i) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={`table-row-${i}`}
                  >
                    {fields.map((field) => {
                      if (field.type === "actions") {
                        return (
                          <TableCell key={row.id} align="center">
                            <Button onClick={handleEdit}>
                              <input type="text" value={row.id} hidden />
                              <ModeEditOutlineIcon />
                            </Button>
                            <Button color="error" onClick={handleDelete}>
                              <input type="text" value={row.id} hidden />
                              <DeleteOutlineIcon />
                            </Button>
                          </TableCell>
                        );
                      } else if (field.type === "checkbox") {
                        return (
                          <TableCell key={row.id} align="center">
                            <Checkbox
                              checked={row[field.key]}
                              disabled={true}
                            />
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell key={row.id} align="center">
                            {row[field.key]}
                          </TableCell>
                        );
                      }
                    })}

                    {/* {row.slice(1).map((item, vi) => {
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
                      } else if (item.type === "bool") {
                        return (
                          <TableCell
                            key={`table-cell-${i}-${vi}`}
                            align="center"
                          >
                            <Checkbox
                              checked={item.value === "true"}
                              disabled={true}
                            />
                          </TableCell>
                        );
                      }
                    })} */}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {!isLoading && data.length === 0 && <NoDataImage />}
      {isLoading && <LoadingSpin />}
      <TablePagination
        rowsPerPageOptions={[7, 10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default React.memo(CustomTable) as typeof CustomTable;
